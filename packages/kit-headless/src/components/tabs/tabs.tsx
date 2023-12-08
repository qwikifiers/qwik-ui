import {
  $,
  JSXNode,
  QwikIntrinsicElements,
  Signal,
  Slot,
  component$,
  useContextProvider,
  useId,
  useSignal,
  useTask$,
  type FunctionComponent,
} from '@builder.io/qwik';
import { KeyCode } from '../../utils/key-code.type';
import { Behavior } from './behavior.type';
import { Tab, TabProps } from './tab';
import { TabPanel, TabPanelProps } from './tab-panel';
import { tabsContextId } from './tabs-context-id';
import { TabsContext } from './tabs-context.type';
import { TabList } from './tabs-list';

/**
 * TABS TODOs

 *
* aria Tabs Pattern https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 * a11y lint plugin https://www.npmjs.com/package/eslint-plugin-jsx-a11y

* POST Beta
  * Add automated tests for preventDefault on end, home,  pageDown, pageUp

* POST V1:
 * - RTL
 *  NOTE: scrolling support? or multiple lines? (probably not for headless but for tailwind / material )
 * Add ability to close tabs with an ❌ icon (and keyboard support)

* TO DISCUSS
 - name of the components, e.g. Tabs, Tabs.Trigger, Tabs.Panel
 - selectedClassname => selectedClass
 - do we keep all current props (tabId callbacks?)
 - shorthand for tab: "label" or "tab"?
 - the TODOs
  *
 */

export type TabsProps = {
  behavior?: Behavior;
  selectedTabId?: string;
  selectedIndex?: number;
  vertical?: boolean;
  // TODO rename to selectedClass
  selectedClassName?: string;
  onSelectedIndexChange$?: (index: number) => void;
  onSelectedTabIdChange$?: (tabId: string) => void;
  'bind:selectedIndex'?: Signal<number | undefined>;
  'bind:selectedTabId'?: Signal<string | undefined>;
  tabClass?: QwikIntrinsicElements['div']['class'];
  panelClass?: QwikIntrinsicElements['div']['class'];
} & QwikIntrinsicElements['div'];

export type TabInfo = {
  tabId: string;
  index: number;
  tabProps: TabProps;
  panelProps: TabPanelProps;
};

// This function reads the children, assigns indexes and creates a
// standard structure. It must take care to retain the props objects
// unchanged so signals keep working
export const Tabs: FunctionComponent<TabsProps> = (props) => {
  const { children: myChildren, tabClass, panelClass, ...rest } = props;
  const childrenToProcess = Array.isArray(myChildren) ? [...myChildren] : [myChildren];
  let tabListComponent: JSXNode | undefined;
  const tabComponents: JSXNode[] = [];
  const panelComponents: JSXNode[] = [];
  const tabInfoList: TabInfo[] = [];
  let panelIndex = 0;
  let selectedIndex;

  // Extract the Tab related components from the children
  while (childrenToProcess.length) {
    const child = childrenToProcess.shift() as JSXNode;
    if (!child) {
      continue;
    }
    if (Array.isArray(child)) {
      childrenToProcess.unshift(...child);
      continue;
    }

    switch (child.type) {
      case TabList: {
        tabListComponent = child;
        const tabListChildren = Array.isArray(child.props.children)
          ? child.props.children
          : [child.props.children];

        childrenToProcess.unshift(...tabListChildren);
        break;
      }
      case Tab: {
        if (child.props.selected) {
          const currentTabIndex = tabComponents.length;
          selectedIndex = currentTabIndex;
          child.props.selected = undefined;
        }
        tabComponents.push(child);
        break;
      }
      case TabPanel: {
        const { label, selected } = child.props as TabPanelProps;
        // The consumer must provide a key if they change the order
        const matchedTabComponent = tabComponents[panelIndex];
        const tabIdFromTabMaybe =
          (matchedTabComponent?.props as TabProps).tabId || matchedTabComponent?.key;
        const tabId: string = tabIdFromTabMaybe || child.key || `${panelIndex}`;

        if (label) {
          tabComponents.push(<Tab>{label}</Tab>);
        }
        if (selected) {
          selectedIndex = panelIndex;
          child.props.selected = undefined;
        }

        // Always assign a key
        child.key = tabId;
        // Add props but don't replace the object
        child.props._tabId = tabId;
        child.props._extraClass = panelClass;

        panelComponents.push(child);
        tabInfoList.push({
          tabId,
          index: panelIndex,
          tabProps: {},
          panelProps: child.props,
        } as TabInfo);
        panelIndex++;

        break;
      }
      default: {
        console.error(`unhandled component ${child.type} given to Tabs`);
      }
    }
  }

  if (tabComponents.length !== panelIndex) {
    console.error(
      `mismatched number of tabs and panels: ${tabComponents.length} ${panelIndex}`,
    );
  }

  tabComponents.forEach((tab, index) => {
    const tabId = tabInfoList[index]?.tabId;
    tab.key = tabId;
    tab.props.tabId = tabId;
    tab.props._extraClass = tabClass;
    if (
      tabInfoList[index].panelProps.disabled !== undefined &&
      tab.props.disabled === undefined
    ) {
      tab.props.disabled = tabInfoList[index].panelProps.disabled;
    }
    tabInfoList[index].tabProps = tab.props as TabProps;
  });

  if (tabListComponent) {
    tabListComponent.children = tabComponents;
    tabListComponent.props.children = tabComponents;
  } else {
    // Creating it as <TabList /> and adding children later doesn't work
    tabListComponent = <TabList>{tabComponents}</TabList>;
  }

  if (typeof selectedIndex === 'number') {
    rest.selectedIndex = selectedIndex;
  }

  return (
    <TabsImpl tabInfoList={tabInfoList} {...rest}>
      {tabListComponent}
      {panelComponents}
    </TabsImpl>
  );
};

export const TabsImpl = component$((props: TabsProps & { tabInfoList: TabInfo[] }) => {
  const {
    // We take these out of the props for the DOM element but we must refer
    // to them as e.g. props.tabs for reactivity
    tabInfoList: _0,
    behavior = 'manual',
    selectedTabId: _1,
    selectedIndex: _2,
    vertical,
    selectedClassName,
    onSelectedIndexChange$,
    onSelectedTabIdChange$,
    'bind:selectedIndex': givenIndexSig,
    'bind:selectedTabId': givenTabIdSig,
    ...rest
  } = props;
  const tabsPrefix = useId();
  const ref = useSignal<HTMLElement | undefined>();

  const initialSelectedIndexSig = useSignal<number>();
  const selectedIndexSig = givenIndexSig || initialSelectedIndexSig;
  const initialSelectedTabIdSig = useSignal<string>();
  const selectedTabIdSig = givenTabIdSig || initialSelectedTabIdSig;

  useTask$(function syncTabsTask({ track }) {
    // Possible optimizer bug: tracking only works with props.tabs
    // TODO: Write a test in Qwik optimizer to prove this bug
    const tabInfoList = track(() => props.tabInfoList);
    const tabId = selectedTabIdSig.value;
    syncSelectedStateSignals(
      tabInfoList,
      selectedIndexSig,
      selectedTabIdSig,
      { tabIdToSelect: tabId },
      true,
    );
  });
  useTask$(function syncPropSelectedIndexTask({ track }) {
    const updatedIndexFromProps = track(() => props.selectedIndex);
    syncSelectedStateSignals(props.tabInfoList, selectedIndexSig, selectedTabIdSig, {
      indexToSelect: updatedIndexFromProps,
    });
  });
  useTask$(function syncSelectedIndexSigTask({ track }) {
    const updatedIndexSignal = track(() => selectedIndexSig.value);
    syncSelectedStateSignals(props.tabInfoList, selectedIndexSig, selectedTabIdSig, {
      indexToSelect: updatedIndexSignal,
    });
    if (typeof selectedIndexSig.value !== 'undefined') {
      onSelectedIndexChange$?.(selectedIndexSig.value);
    }
  });
  useTask$(function syncPropSelectedTabIdTask({ track }) {
    const updatedTabIdFromProps = track(() => props.selectedTabId);
    syncSelectedStateSignals(props.tabInfoList, selectedIndexSig, selectedTabIdSig, {
      tabIdToSelect: updatedTabIdFromProps,
    });
  });
  useTask$(function syncSelectedTabIdSigTask({ track }) {
    let updatedTabId = track(() => selectedTabIdSig.value);
    // If we don't have a tabId by the time this task runs, select the first enabled tab
    if (typeof updatedTabId !== 'string') {
      const tab = getEnabledTab(props.tabInfoList, 0);
      if (tab) {
        updatedTabId = tab.tabId;
      }
    }
    syncSelectedStateSignals(props.tabInfoList, selectedIndexSig, selectedTabIdSig, {
      tabIdToSelect: updatedTabId,
    });
    if (typeof selectedTabIdSig.value !== 'undefined') {
      onSelectedTabIdChange$?.(selectedTabIdSig.value);
    }
  });

  useTask$(function callOnSelectedChangeTask({ track }) {
    if (!onSelectedIndexChange$) return;
    const idx = track(() => selectedIndexSig.value);
    if (typeof idx === 'number' && idx >= 0) onSelectedIndexChange$(idx);
  });

  const selectTab$ = $((tabId: string) => {
    syncSelectedStateSignals(props.tabInfoList, selectedIndexSig, selectedTabIdSig, {
      tabIdToSelect: tabId,
    });
  });

  const selectIfAutomatic$ = $((tabId: string) => {
    if (behavior === 'automatic') {
      selectTab$(tabId);
    }
  });

  const onTabKeyDown$ = $((key: KeyCode, currentTabId: string) => {
    const tabsRootElement = ref.value;

    const currentFocusedTabIndex = props.tabInfoList.findIndex(
      (tabData) => tabData.tabId === currentTabId,
    );

    let tabInfo;
    if (
      (!vertical && key === KeyCode.ArrowRight) ||
      (vertical && key === KeyCode.ArrowDown)
    ) {
      tabInfo = findNextEnabledTab(props.tabInfoList, currentFocusedTabIndex + 1, true);
    } else if (
      (!vertical && key === KeyCode.ArrowLeft) ||
      (vertical && key === KeyCode.ArrowUp)
    ) {
      tabInfo = findPrevEnabledTab(props.tabInfoList, currentFocusedTabIndex, true);
    } else if (key === KeyCode.Home || key === KeyCode.PageUp) {
      tabInfo = findNextEnabledTab(props.tabInfoList, 0);
    } else if (key === KeyCode.End || key === KeyCode.PageDown) {
      tabInfo = findPrevEnabledTab(props.tabInfoList, props.tabInfoList.length);
    }
    if (tabInfo) {
      focusOnTab(tabInfo.index);
    }

    function focusOnTab(index: number) {
      const tabListElement = tabsRootElement?.children[0];
      const tabToFocusOn = tabListElement?.children[index] as HTMLElement;
      tabToFocusOn.focus();
    }
  });

  const contextService: TabsContext = {
    selectTab$,
    tabsPrefix,
    onTabKeyDown$,
    selectIfAutomatic$,
    selectedTabIdSig,
    selectedClassName,
  };

  useContextProvider(tabsContextId, contextService);

  return (
    <div ref={ref} {...rest}>
      <Slot />
    </div>
  );
});

// This helper function is separate so that it doesn't have to be a QRL
// and it doesn't result in race conditions between tasks
// We were seeing tabId signal task running before updateSignals when it QRL
export const syncSelectedStateSignals = (
  tabsInfoList: TabInfo[],
  selectedIndexSig: Signal<number | undefined>,
  selectedTabIdSig: Signal<string | undefined>,
  { indexToSelect, tabIdToSelect }: { indexToSelect?: number; tabIdToSelect?: string },
  ignoreIndexNotFound?: boolean,
) => {
  if (tabIdToSelect) {
    indexToSelect = tabsInfoList.findIndex((tabInfo) => tabInfo.tabId === tabIdToSelect);
  }
  if (typeof indexToSelect !== 'number') return;

  if (indexToSelect && indexToSelect < 0) {
    if (!ignoreIndexNotFound) {
      return;
    }
    // given index doesn't exist, find one nearby
    indexToSelect = selectedIndexSig.value;
    if (typeof indexToSelect !== 'number') return;
  }
  const tab = getEnabledTab(tabsInfoList, indexToSelect);
  if (
    tab &&
    (tab.index !== selectedIndexSig.value || tab.tabId !== selectedTabIdSig.value)
  ) {
    selectedIndexSig.value = tab.index;
    selectedTabIdSig.value = tab.tabId;
  }
};

export const getEnabledTab = (tabInfoList: TabInfo[], index: number) =>
  findNextEnabledTab(tabInfoList, index) || findPrevEnabledTab(tabInfoList, index);

// Find an enabled tab including the index
export const findNextEnabledTab = (
  tabsInfo: TabInfo[],
  index: number,
  wrap?: boolean,
) => {
  let info;
  for (let i = Math.max(0, index); i < tabsInfo.length; i++) {
    info = tabsInfo[i];
    if (!isDisabled(info)) {
      return info;
    }
  }
  if (wrap) {
    for (let i = 0; i < index; i++) {
      info = tabsInfo[i];
      if (!isDisabled(info)) {
        return info;
      }
    }
  }
  return;
};

// Find an enabled tab before the index
export const findPrevEnabledTab = (
  tabsInfo: TabInfo[],
  index: number,
  wrap?: boolean,
) => {
  let info;
  for (let i = Math.min(tabsInfo.length, index) - 1; i >= 0; i--) {
    info = tabsInfo[i];
    if (!isDisabled(info)) {
      return info;
    }
  }
  if (wrap) {
    for (let i = tabsInfo.length - 1; i > index; i--) {
      info = tabsInfo[i];
      if (!isDisabled(info)) {
        return info;
      }
    }
  }
  return;
};

export const isDisabled = (tabInfo: TabInfo) => tabInfo.tabProps.disabled;
