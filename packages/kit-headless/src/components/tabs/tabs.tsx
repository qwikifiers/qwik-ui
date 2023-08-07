import {
  $,
  QwikIntrinsicElements,
  Slot,
  component$,
  useComputed$,
  useContextProvider,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
  type ClassList,
  type FunctionComponent,
  type PropsOf
} from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';
import { KeyCode } from '../../utils/key-code.type';
import { Behavior } from './behavior.type';
import { Tab } from './tab';
import { TabPanel } from './tab-panel';
import { tabsContextId } from './tabs-context-id';
import { TabsContext } from './tabs-context.type';
import { TabList } from './tabs-list';
import { Signal } from '@builder.io/qwik';

/**
 * TABS TODOs

 *
* aria Tabs Pattern https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 * a11y lint plugin https://www.npmjs.com/package/eslint-plugin-jsx-a11y

* POST Alpha
  * Add a way to add a default tab class from the root (for styling all the tabs in one place)

* POST Beta
  * Add automated tests for preventDefault on end, home,  pageDown, pageUp
  * Add automated tests for SSR indexing behavior (and in general)


* POST V1:
 * - RTL
 *  NOTE: scrolling support? or multiple lines? (probably not for headless but for tailwind / material )
 * Add ability to close tabs with an ❌ icon (and keyboard support)

 *
 */

export type TabsProps = {
  behavior?: Behavior;
  selectedId?: string;
  selectedIndex?: number;
  vertical?: boolean;
  selectedClassName?: string;
  onSelectedIndexChange$?: (index: number) => void;
  'bind:selectedIndex'?: Signal<number>;
  /** @deprecated Internal use only */
  _known?: Record<string, TabInfo>;
} & QwikIntrinsicElements['div'];

export interface TabInfo {
  tabId: string;
  index: number;
  disabled?: boolean;
}

export const TabsImpl = component$((props: TabsProps) => {
  const behavior = props.behavior ?? 'manual';

  const ref = useSignal<HTMLElement | undefined>();
  const mySelectedIndexSig = useSignal(0);
  const selectedIndexSig = props['bind:selectedIndex'] || mySelectedIndexSig;
  const lastAssignedTabIndexSig = useSignal(-1);
  const lastAssignedPanelIndexSig = useSignal(-1);
  const tabsMap = useStore<Record<string, TabInfo>>(props._known!);

  useTask$(({ track }) => {
    track(() => props.selectedIndex);
    selectedIndexSig.value = props.selectedIndex || 0;
  });

  useTask$(({ track }) => {
    const fn = props.onSelectedIndexChange$;
    if (fn) {
      track(() => selectedIndexSig.value);
      fn(selectedIndexSig.value);
    }
  });

  const selectTab$ = $((tabId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const info = props._known![tabId];
    if (!info || info.disabled) {
      return;
    }
    selectedIndexSig.value = info.index;
  });

  const selectIfAutomatic$ = $((tabId: string) => {
    if (behavior === 'automatic') {
      selectTab$(tabId);
    }
  });

  const updateTabState$ = $((tabId: string, state: Partial<TabInfo>) => {
    const prevState = tabsMap[tabId];
    tabsMap[tabId] = { ...prevState, ...state };
  });

  const getNextServerAssignedTabIndex$ = $(() => {
    lastAssignedTabIndexSig.value++;
    return lastAssignedTabIndexSig.value;
  });

  const getNextServerAssignedPanelIndex$ = $(() => {
    lastAssignedPanelIndexSig.value++;
    return lastAssignedPanelIndexSig.value;
  });

  const isIndexSelected$ = $((index?: number) => {
    return selectedIndexSig.value === index;
  });

  const isTabSelected$ = $((tabId: string) => {
    return selectedIndexSig.value === tabsMap[tabId]?.index;
  });

  const isPanelSelected$ = $((panelId: string) => {
    return selectedIndexSig.value === tabPanelsMap[panelId]?.index;
  });

  const onTabKeyDown$ = $((key: KeyCode, currentTabId: string) => {
    const tabsRootElement = ref.value;

    const enabledTabs = tabPairsList.filter((tabPair) => {
      return !tabsMap[tabPair.tabId].disabled;
    });
    const currentFocusedTabIndex = enabledTabs.findIndex(
      (tabPair) => tabPair.tabId === currentTabId
    );

    if (
      (!props.vertical && key === KeyCode.ArrowRight) ||
      (props.vertical && key === KeyCode.ArrowDown)
    ) {
      let nextTabId = enabledTabs[0].tabId;

      if (currentFocusedTabIndex < enabledTabs.length - 1) {
        nextTabId = enabledTabs[currentFocusedTabIndex + 1].tabId;
      }
      focusOnTab(nextTabId);
    }

    if (
      (!props.vertical && key === KeyCode.ArrowLeft) ||
      (props.vertical && key === KeyCode.ArrowUp)
    ) {
      let previousTabId = enabledTabs[enabledTabs.length - 1].tabId;

      if (currentFocusedTabIndex !== 0) {
        previousTabId = enabledTabs[currentFocusedTabIndex - 1].tabId;
      }
      focusOnTab(previousTabId);
    }

    if (key === KeyCode.Home || key === KeyCode.PageUp) {
      const firstTabId = enabledTabs[0].tabId;
      focusOnTab(firstTabId);
    }

    if (key === KeyCode.End || key === KeyCode.PageDown) {
      const lastTabId = enabledTabs[enabledTabs.length - 1].tabId;
      focusOnTab(lastTabId);
    }

    function focusOnTab(tabId: string) {
      tabsRootElement?.querySelector<HTMLElement>(`[data-tab-id='${tabId}']`)?.focus();
    }
  });

  const contextService: TabsContext = {
    selectTab$,
    isTabSelected$,
    isPanelSelected$,
    updateTabState$,
    getNextServerAssignedTabIndex$,
    getNextServerAssignedPanelIndex$,
    isIndexSelected$,
    onTabKeyDown$,
    selectIfAutomatic$,
    selectedClassName: props.selectedClassName
  };

  useContextProvider(tabsContextId, contextService);

  const selectEnabledIndex$ = $((newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    }
    if (newIndex >= tabPairsList.length) {
      newIndex = 0;
    }
    let enabledTabIndex = findNextEnabledTab(tabPairsList, newIndex);
    if (enabledTabIndex === -1) {
      enabledTabIndex = findPreviousEnabledTab(tabPairsList, newIndex);
    }
    newIndex = enabledTabIndex;

    selectedIndexSig.value = newIndex;

    function findNextEnabledTab(tabPairsList: TabPair[], index: number) {
      for (let i = index; i < tabPairsList.length; i++) {
        const tabId = tabPairsList[i].tabId;
        if (!tabsMap[tabId].disabled) {
          return i;
        }
      }
      return -1;
    }

    function findPreviousEnabledTab(tabPairsList: TabPair[], index: number) {
      for (let i = Math.min(index, tabPairsList.length - 1); i >= 0; i--) {
        const tabId = tabPairsList[i].tabId;
        if (!tabsMap[tabId].disabled) {
          return i;
        }
      }
      return -1;
    }
  });

  useVisibleTask$(async function buildTabsInfoVisibleTask({ track }) {
    track(() => shouldReIndexTabsSig.value);

    if (!shouldReIndexTabsSig.value) {
      return;
    }
    shouldReIndexTabsSig.value = false;

    if (!ref.value) {
      return;
    }

    const [tabElements, tabPanelElements] = getTabsAndPanels();

    // See if the deleted index was the last one
    let lastTabWasSelectedPreviously = false;
    if (selectedIndexSig.value === tabPairsList.length - 1) {
      lastTabWasSelectedPreviously = true;
    }

    // clear all lists and maps
    // TODO: delete object maps, or turn into Map()
    tabPairsList.length = 0;

    let deletedTabId: string | undefined = undefined;
    let indexToBeSelected = selectedIndexSig.value;

    tabElements.forEach((tab, index) => {
      const tabId = tab.getAttribute('data-tab-id');
      const isTabDisabled = tab.hasAttribute('disabled');

      let thisTabWasDeleted = true;

      if (selectedTabIdSig.value === '') {
        thisTabWasDeleted = false;
      } else if (selectedTabIdSig.value === tabId) {
        indexToBeSelected = index;
        thisTabWasDeleted = false;
      }

      const tabPanelId = getTabPanelId(tabPanelElements, index);

      if (!tabId || !tabPanelId) {
        throw new Error('Missing tab id or tab panel id for tab: ' + index);
      }
      tabPairsList.push({ tabId, tabPanelId });

      tabsMap[tabId] = {
        tabId,
        tabPanelId,
        index,
        disabled: isTabDisabled
      };

      tabPanelsMap[tabPanelId] = {
        tabId,
        tabPanelId,
        index
      };

      if (thisTabWasDeleted) {
        deletedTabId = tabId;
      }
    });

    if (tabPairsList.length > 0) {
      if (lastTabWasSelectedPreviously && deletedTabId) {
        indexToBeSelected = tabPairsList.length - 1;
      }
    }

    await selectEnabledIndex$(indexToBeSelected);

    function getTabsAndPanels() {
      const tabsRootElement = ref.value!;
      const tabListElement = tabsRootElement.querySelector('[role="tablist"]');
      let tabElements: Element[] = [];
      if (tabListElement) {
        tabElements = Array.from(tabListElement?.children).filter((child) => {
          return child.getAttribute('role') === 'tab';
        });
      }

      let tabPanelElements: Element[] = [];
      if (tabsRootElement.children) {
        tabPanelElements = Array.from(tabsRootElement.children).filter((child) => {
          return child.getAttribute('role') === 'tabpanel';
        });
      }
      return [tabElements, tabPanelElements];
    }

    function getTabPanelId(tabPanelElements: Element[], index: number) {
      const tabPanelElement = tabPanelElements[index];
      if (!tabPanelElement) {
        throw new Error('Missing tab panel for tab: ' + index);
      }
      return tabPanelElement.getAttribute('data-tabpanel-id');
    }
  });

  return (
    <div ref={ref} {...props}>
      <div>Hi there</div>
      <Slot />
      After
    </div>
  );
});

// TODO default classes
export const Tabs: FunctionComponent<
  Omit<PropsOf<typeof TabsImpl>, 'children'> & {
    children: JSX.Element | JSX.Element[];
    tabClass?: ClassList;
    panelClass?: ClassList;
  }
> = ({ children, tabClass, panelClass, ...props }) => {
  console.log('START RENDER');
  children = Array.isArray(children) ? [...children] : [children];

  let tabList: JSX.Element | undefined;
  const tabs: JSX.Element[] = [];
  const panels: JSX.Element[] = [];
  const known: Record<string, TabInfo> = {};
  let tabIndex = 0;
  let panelIndex = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (!child) {
      continue;
    }
    if (Array.isArray(child)) {
      children.splice(i + 1, 0, ...child);
      continue;
    }
    // TODO handle tablist
    switch (child.type) {
      case TabList: {
        tabList = child;
        children.splice(i + 1, 0, ...child.props.children);
        break;
      }
      case Tab: {
        // TODO: check if in inline components it warns the dev to assign a key
        const { key = tabIndex } = child.props;
        console.log('TAB key', key, child.props);
        tabs.push(child);
        tabIndex++;
        console.log('tabIndex', tabIndex);
        break;
      }
      case TabPanel: {
        const { title, key = `${panelIndex}` } = child.props;
        console.log('TAB PANEL key', key, child.props);
        known[key] = { tabId: key, index: panelIndex };
        child.props = {
          ...props,
          title: undefined,
          key,
          tabId: key,
          index: panelIndex,
          class: [panelClass, child.props.class]
        };
        if (title) {
          tabs.push(
            <Tab class={tabClass} key={key} tabId={key}>
              {title}
            </Tab>
          );
          tabIndex++;
        }
        panels.push(child);
        panelIndex++;
        console.log('panelIndex', panelIndex);
        break;
      }
      default: {
        console.error('unknown type', String(child.type));
        // throw new TypeError(`Tabs can't handle the given children`);
      }
    }
  }

  console.log(`tabIndex, panelIndex`, tabIndex, panelIndex);
  if (tabIndex !== panelIndex) {
    console.error(`mismatched number of tabs and panels: ${tabIndex} ${panelIndex}`);
  }

  for (let index = 0; index < tabs.length; index++) {
    const tab = tabs[index];
    const key = panels[index as keyof typeof panels]?.props.key;
    tab.props = {
      ...tab.props,
      key,
      index,
      tabId: key,
      class: [tabClass, tab.props.class]
    };
  }

  tabList ||= <TabList />;
  tabList.children = tabs;

  return (
    <TabsImpl _known={known} {...props}>
      {tabList}
      {panels}
    </TabsImpl>
  );
};
