import {
  $,
  JSXNode,
  QwikIntrinsicElements,
  Signal,
  Slot,
  component$,
  useComputed$,
  useContextProvider,
  useId,
  useSignal,
  useStore,
  useTask$,
  type ClassList,
  type FunctionComponent,
  type PropsOf
} from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';
import { KeyCode } from '../../utils/key-code.type';
import { Behavior } from './behavior.type';
import { TAB_ID_PREFIX, Tab } from './tab';
import { TabPanel } from './tab-panel';
import { tabsContextId } from './tabs-context-id';
import { TabsContext } from './tabs-context.type';
import { TabList } from './tabs-list';

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
} & QwikIntrinsicElements['div'];

export interface TabInfo {
  tabId: string;
  index: number;
}

// TODO: default classes
// TODO: Add tests
export const Tabs: FunctionComponent<
  Omit<PropsOf<typeof TabsImpl>, 'children' | '_tabsInfoList'> & {
    children: unknown;
    tabClass?: ClassList;
    panelClass?: ClassList;
  }
> = ({ children: myChildren, tabClass, panelClass, ...props }) => {
  const childrenToProcess = (
    Array.isArray(myChildren) ? [...myChildren] : [myChildren]
  ) as JSXNode[];
  let tabListElement: JSX.Element | undefined;
  const tabComponents: JSX.Element[] = [];
  const panelComponents: JSX.Element[] = [];
  const tabsInfoList: TabInfo[] = [];
  let tabIndex = 0;
  let panelIndex = 0;

  // Extract the Tab related components from the children
  while (childrenToProcess.length) {
    const child = childrenToProcess.shift();
    if (!child) {
      continue;
    }
    if (Array.isArray(child)) {
      childrenToProcess.unshift(...child);
      continue;
    }

    switch (child.type) {
      case TabList: {
        tabListElement = child;
        const tabListChildren = Array.isArray(child.props.children)
          ? child.props.children
          : [child.props.children];

        childrenToProcess.unshift(...tabListChildren);
        break;
      }
      case Tab: {
        tabComponents.push(child);
        tabIndex++;
        break;
      }
      case TabPanel: {
        const { title, ...props } = child.props;
        const tabId = child.key || `${panelIndex}`;

        if (title) {
          tabComponents.push(<Tab>{title}</Tab>);
          tabIndex++;
        }
        child.key = tabId;
        child.props = {
          ...props,
          _tabId: tabId,
          _index: panelIndex
        };
        if (panelClass) {
          // TODO handle signal class, probably best to pass _extraClass so the signal is used in the component
          child.props.class = [panelClass, child.props.class];
        }
        panelComponents.push(child);
        tabsInfoList.push({ tabId, index: panelIndex });
        panelIndex++;

        break;
      }
      default: {
        console.error('unknown type', String(child.type));
        // throw new TypeError(`Tabs can't handle the given children`);
      }
    }
  }

  if (tabIndex !== panelIndex) {
    console.error(`mismatched number of tabs and panels: ${tabIndex} ${panelIndex}`);
  }

  tabComponents.forEach((tab, index) => {
    const tabId = tabsInfoList[index]?.tabId;
    tab.key = tabId;
    tab.props = {
      ...tab.props,
      _index: index,
      _tabId: tabId,
      class: tabClass ? [tabClass, tab.props.class] : tab.props.class
    };
    if (tabClass) {
      // TODO handle signal class, probably best to pass _extraClass so the signal is used in the component
      tab.props.class = [tabClass, tab.props.class];
    }
  });

  tabListElement ||= <TabList />;

  // tabListElement.props.children = tabComponents;
  tabListElement.children = tabComponents;

  return (
    <TabsImpl _tabInfoList={tabsInfoList} {...props}>
      {tabListElement}
      {panelComponents}
    </TabsImpl>
  );
};

export const TabsImpl = component$(
  (props: TabsProps & { _tabInfoList?: TabInfo[] | undefined }) => {
    const behavior = props.behavior ?? 'manual';

    const ref = useSignal<HTMLElement | undefined>();

    const initialSelectedIndexSig = useSignal(0);
    // TODO: Add tests for bind
    const selectedIndexSig = props['bind:selectedIndex'] || initialSelectedIndexSig;

    const lastSelectedTabSig = useSignal<TabInfo | undefined>();

    const tabsPrefix = useId();

    const { _tabInfoList: tabsInfoList } = props as { _tabInfoList: TabInfo[] };
    const disabledStore = useStore<Record<string, boolean>>({});

    const enabledTabsSig = useComputed$(() => {
      return tabsInfoList.filter((tab) => !disabledStore[tab.tabId]);
    });

    useTask$(function syncPropSelectedIndexTask({ track }) {
      selectedIndexSig.value = track(() => props.selectedIndex) || 0;
    });

    useTask$(function selectFirstEnabledTabTask({ track }) {
      track(() => selectedIndexSig.value);
      if (selectedIndexSig.value === -1) {
        return;
      }
      if (selectedIndexSig.value >= tabsInfoList.length) {
        selectedIndexSig.value = tabsInfoList.length - 1;
        return;
      }
      const selectedTabId = tabsInfoList[selectedIndexSig.value].tabId;
      if (disabledStore[selectedTabId]) {
        let enabledTabIndex = findNextEnabledTab(tabsInfoList, selectedIndexSig.value);
        if (enabledTabIndex === -1) {
          enabledTabIndex = findPreviousEnabledTab(tabsInfoList, selectedIndexSig.value);
        }
        if (enabledTabIndex === -1) {
          console.warn('no enabled tabs to select');
        }
        selectedIndexSig.value = enabledTabIndex;
      }

      function findNextEnabledTab(tabsStore: TabInfo[], index: number) {
        tabsInfoList.findIndex((tab) => !disabledStore[tab.tabId]);
        for (let i = index; i < tabsStore.length; i++) {
          if (!disabledStore[tabsStore[i].tabId]) {
            return i;
          }
        }
        return -1;
      }

      function findPreviousEnabledTab(tabsStore: TabInfo[], index: number) {
        for (let i = index; i >= 0; i--) {
          if (!disabledStore[tabsStore[i].tabId]) {
            return i;
          }
        }
        return -1;
      }
    });

    useTask$(function callOnSelectedChangeTask({ track }) {
      if (props.onSelectedIndexChange$) {
        props.onSelectedIndexChange$(track(() => selectedIndexSig.value));
      }
    });

    useTask$(function syncLastSelectedTab({ track }) {
      track(() => selectedIndexSig.value);
      lastSelectedTabSig.value = tabsInfoList[selectedIndexSig.value];
    });

    useTask$(async function updateSelectedIndexAfterTabListChangeTask({ track }) {
      track(() => tabsInfoList.length);

      if (!lastSelectedTabSig.value) {
        return;
      }
      const lastSelectedTabId = lastSelectedTabSig.value.tabId;
      const lastSelectedTabIndex = lastSelectedTabSig.value.index;

      const foundUpdatedSelectedTabIndex = tabsInfoList.findIndex(
        (tab) => tab.tabId === lastSelectedTabId
      );
      if (foundUpdatedSelectedTabIndex === -1) {
        selectedIndexSig.value = lastSelectedTabIndex + 1;

        return;
      }

      selectedIndexSig.value = foundUpdatedSelectedTabIndex;
    });

    const selectTab$ = $((tabId: string) => {
      const foundTab = enabledTabsSig.value.find((tab) => tab.tabId === tabId);

      if (foundTab) {
        selectedIndexSig.value = foundTab.index;
      }
    });

    const selectIfAutomatic$ = $((tabId: string) => {
      if (behavior === 'automatic') {
        selectTab$(tabId);
      }
    });

    const setTabDisabled$ = $((tabId: string, disabled: boolean) => {
      const foundTabIndex = tabsInfoList.findIndex((tab) => tab.tabId === tabId);

      disabledStore[tabId] = disabled;
      if (foundTabIndex === selectedIndexSig.value && disabled) {
        selectedIndexSig.value++;
      }
    });

    const onTabKeyDown$ = $((key: KeyCode, currentTabId: string) => {
      const tabsRootElement = ref.value;

      const enabledTabs = enabledTabsSig.value;
      const currentFocusedTabIndex = enabledTabs.findIndex(
        (tabData) => tabData.tabId === currentTabId
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
        const fullTabElementId = tabsPrefix + TAB_ID_PREFIX + tabId;
        tabsRootElement
          ?.querySelector<HTMLElement>(`[data-tab-id='${fullTabElementId}']`)
          ?.focus();
      }
    });

    const contextService: TabsContext = {
      selectTab$,
      tabsPrefix,
      setTabDisabledStatus$: setTabDisabled$,
      onTabKeyDown$,
      selectIfAutomatic$,
      selectedIndexSig,
      selectedClassName: props.selectedClassName
    };

    useContextProvider(tabsContextId, contextService);

    return (
      <div ref={ref} {...props}>
        <Slot />
      </div>
    );
  }
);
