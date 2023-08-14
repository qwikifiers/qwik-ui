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
  type FunctionComponent
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
export const isDisabled = (i: TabInfo) => i.tabProps.disabled;
// Find an enabled tab including the index
export const findEnabledTab = (tabs: TabInfo[], index: number, wrap?: boolean) => {
  let info;
  for (let i = Math.max(0, index); i < tabs.length; i++) {
    info = tabs[i];
    if (!isDisabled(info)) {
      return info;
    }
  }
  if (wrap) {
    for (let i = 0; i < index; i++) {
      info = tabs[i];
      if (!isDisabled(info)) {
        return info;
      }
    }
  }
  return;
};

// Find an enabled tab before the index
export const findPrevEnabledTab = (tabs: TabInfo[], index: number, wrap?: boolean) => {
  let info;
  for (let i = Math.min(tabs.length, index) - 1; i >= 0; i--) {
    info = tabs[i];
    if (!isDisabled(info)) {
      return info;
    }
  }
  if (wrap) {
    for (let i = tabs.length - 1; i > index; i--) {
      info = tabs[i];
      if (!isDisabled(info)) {
        return info;
      }
    }
  }
  return;
};

export const getEnabledTab = (tabInfoList: TabInfo[], index: number) =>
  findEnabledTab(tabInfoList, index) || findPrevEnabledTab(tabInfoList, index);

// This function reads the children, assigns indexes and creates a
// standard structure. It must take care to retain the props objects
// unchanged so signals keep working
export const Tabs: FunctionComponent<TabsProps> = (props) => {
  const { children: myChildren, tabClass, panelClass, ...rest } = props;
  const childrenToProcess = (
    Array.isArray(myChildren) ? [...myChildren] : [myChildren]
  ) as JSXNode[];
  let tabListElement: JSXNode | undefined;
  const tabComponents: JSXNode[] = [];
  const panelComponents: JSXNode[] = [];
  const tabsInfo: TabInfo[] = [];
  let panelIndex = 0;
  let selectedIndex;

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
        if (child.props.selected) {
          selectedIndex = tabComponents.length;
          child.props.selected = undefined;
        }
        tabComponents.push(child);
        break;
      }
      case TabPanel: {
        const { label, selected } = child.props;
        // The consumer must provide a key if they change the order
        const tabIdFromTabMaybe = tabComponents[panelIndex]?.key;
        const tabId = tabIdFromTabMaybe || child.key || `${panelIndex}`;

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
        tabsInfo.push({
          tabId,
          index: panelIndex,
          panelProps: child.props
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
      `mismatched number of tabs and panels: ${tabComponents.length} ${panelIndex}`
    );
  }

  tabComponents.forEach((tab, index) => {
    const tabId = tabsInfo[index]?.tabId;
    tab.key = tabId;
    tab.props._tabId = tabId;
    tab.props._extraClass = tabClass;
    tabsInfo[index].tabProps = tab.props;
  });

  if (tabListElement) {
    tabListElement.children = tabComponents;
    tabListElement.props.children = tabComponents;
  } else {
    // Creating it as <TabList /> and adding children later doesn't work
    tabListElement = <TabList>{tabComponents}</TabList>;
  }

  if (typeof selectedIndex === 'number') {
    rest.selectedIndex = selectedIndex;
  }

  return (
    <TabsImpl tabs={tabsInfo} {...rest}>
      {tabListElement}
      {panelComponents}
    </TabsImpl>
  );
};

// This helper function is separate so that it doesn't have to be a QRL
// and it doesn't result in race conditions between tasks
// We were seeing tabId signal task running before updateSignals when it was a QRL
export const updateSignals = (
  tabs: TabInfo[],
  indexSig: Signal<number | undefined>,
  tabIdSig: Signal<string | undefined>,
  { idx, tabId }: { idx?: number; tabId?: string },
  tryHarder?: boolean
) => {
  if (tabId) {
    idx = tabs.findIndex((t) => t.tabId === tabId);
  }
  if (typeof idx !== 'number') return;
  if (idx && idx < 0) {
    if (!tryHarder) {
      return;
    }
    // given index doesn't exist, find one nearby
    idx = indexSig.value;
    if (typeof idx !== 'number') return;
  }
  const tab = getEnabledTab(tabs, idx);
  if (tab && (tab.index !== indexSig.value || tab.tabId !== tabIdSig.value)) {
    indexSig.value = tab.index;
    tabIdSig.value = tab.tabId;
  }
};

export const TabsImpl = component$((props: TabsProps & { tabs: TabInfo[] }) => {
  const {
    // We take these out of the props for the DOM element but we must refer
    // to them as e.g. props.tabs for reactivity
    tabs: _0,
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
    const tabs = track(() => props.tabs);
    const tabId = selectedTabIdSig.value;
    updateSignals(tabs, selectedIndexSig, selectedTabIdSig, { tabId }, true);
  });
  useTask$(function syncPropSelectedIndexTask({ track }) {
    const idx = track(() => props.selectedIndex);
    updateSignals(props.tabs, selectedIndexSig, selectedTabIdSig, { idx });
  });
  useTask$(function syncSelectedIndexSigTask({ track }) {
    const idx = track(() => selectedIndexSig.value);
    updateSignals(props.tabs, selectedIndexSig, selectedTabIdSig, { idx });
    if (typeof selectedIndexSig.value !== 'undefined') {
      onSelectedIndexChange$?.(selectedIndexSig.value);
    }
  });
  useTask$(function syncPropSelectedTabIdTask({ track }) {
    const tabId = track(() => props.selectedTabId);
    updateSignals(props.tabs, selectedIndexSig, selectedTabIdSig, { tabId });
  });
  useTask$(function syncSelectedTabIdSigTask({ track }) {
    let tabId = track(() => selectedTabIdSig.value);
    // If we don't have a tabId by the time this task runs, select the first enabled tab
    if (typeof tabId !== 'string') {
      const tab = getEnabledTab(props.tabs, 0);
      if (tab) {
        tabId = tab.tabId;
      }
    }
    updateSignals(props.tabs, selectedIndexSig, selectedTabIdSig, { tabId });
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
    updateSignals(props.tabs, selectedIndexSig, selectedTabIdSig, { tabId });
  });

  const selectIfAutomatic$ = $((tabId: string) => {
    if (behavior === 'automatic') {
      selectTab$(tabId);
    }
  });

  const onTabKeyDown$ = $((key: KeyCode, currentTabId: string) => {
    const tabsRootElement = ref.value;

    const currentFocusedTabIndex = props.tabs.findIndex(
      (tabData) => tabData.tabId === currentTabId
    );

    let tab;
    if (
      (!vertical && key === KeyCode.ArrowRight) ||
      (vertical && key === KeyCode.ArrowDown)
    ) {
      tab = findEnabledTab(props.tabs, currentFocusedTabIndex + 1, true);
    } else if (
      (!vertical && key === KeyCode.ArrowLeft) ||
      (vertical && key === KeyCode.ArrowUp)
    ) {
      tab = findPrevEnabledTab(props.tabs, currentFocusedTabIndex, true);
    } else if (key === KeyCode.Home || key === KeyCode.PageUp) {
      tab = findEnabledTab(props.tabs, 0);
    } else if (key === KeyCode.End || key === KeyCode.PageDown) {
      tab = findPrevEnabledTab(props.tabs, props.tabs.length);
    }
    if (tab) {
      focusOnTab(tab.index);
    }

    function focusOnTab(index: number) {
      tabsRootElement?.children[0]?.children[index]?.focus();
    }
  });

  const contextService: TabsContext = {
    selectTab$,
    tabsPrefix,
    onTabKeyDown$,
    selectIfAutomatic$,
    selectedTabIdSig,
    selectedClassName
  };

  useContextProvider(tabsContextId, contextService);

  return (
    <div ref={ref} {...rest}>
      <Slot />
    </div>
  );
});
