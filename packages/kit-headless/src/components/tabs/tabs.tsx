import {
  $,
  component$,
  Slot,
  useContextProvider,
  useSignal,
  useVisibleTask$,
  useStore,
  useTask$,
  QRL,
  QwikIntrinsicElements,
} from '@builder.io/qwik';
import { tabsContextId } from './tabs-context-id';
import { TabsContext } from './tabs-context.type';
import { Behavior } from './behavior.type';
import { KeyCode } from '../../utils/key-code.type';

/**
 * TABS TODOs
 * 
 * Add examples for:
 *  - Vertical
 *  - disabled
 *  - dynamic
 *  - behavior
 *  - onSelectedIndexChange$
 *  - onClick$
 *
* aria Tabs Pattern https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 * a11y lint plugin https://www.npmjs.com/package/eslint-plugin-jsx-a11y
  
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
  selectedIndex?: number;
  vertical?: boolean;
  onSelectedIndexChange$?: (index: number) => void;
} & QwikIntrinsicElements['div'];

export interface TabPair {
  tabId: string;
  tabPanelId: string;
}

export interface TabInfo {
  tabId: string;
  index: number;
  tabPanelId?: string;
  disabled?: boolean;
}

export const Tabs = component$((props: TabsProps) => {
  const behavior = props.behavior ?? 'manual';

  const ref = useSignal<HTMLElement | undefined>();
  const selectedIndexSig = useSignal(0);
  const lastAssignedTabIndexSig = useSignal(-1);
  const lastAssignedPanelIndexSig = useSignal(-1);

  useTask$(({ track }) => {
    track(() => props.selectedIndex);
    selectedIndexSig.value = props.selectedIndex || 0;
  });

  useTask$(({ track }) => {
    track(() => selectedIndexSig.value);
    if (props.onSelectedIndexChange$) {
      props.onSelectedIndexChange$(selectedIndexSig.value);
    }
  });

  const selectedTabIdSig = useSignal<string>('');
  const shouldReIndexTabsSig = useSignal(true);

  const tabPairsList = useStore<TabPair[]>([]);

  const tabsMap = useStore<{ [key: string]: TabInfo }>({});

  const tabPanelsMap = useStore<{ [key: string]: TabInfo }>({});

  const reIndexTabs$ = $(() => {
    shouldReIndexTabsSig.value = true;
  });

  const getMatchedPanelId$ = $((tabId: string) => {
    return tabsMap[tabId]?.tabPanelId;
  });

  const getMatchedTabId$ = $((panelId: string) => {
    return tabPanelsMap[panelId]?.tabId;
  });

  const selectTab$ = $((tabId: string) => {
    const tab = tabsMap[tabId];
    if (!tab || tab.disabled) {
      return;
    }
    selectedTabIdSig.value = tabId;
    selectedIndexSig.value = tabsMap[tabId].index || 0;
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

    if (key === KeyCode.Enter) {
    }

    if (
      key === KeyCode.ArrowRight ||
      (props.vertical && key === KeyCode.ArrowDown)
    ) {
      let nextTabId = enabledTabs[0].tabId;

      if (currentFocusedTabIndex < tabPairsList.length - 1) {
        nextTabId = enabledTabs[currentFocusedTabIndex + 1].tabId;
      }
      focusOnTab(nextTabId);
    }

    if (
      key === KeyCode.ArrowLeft ||
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
      tabsRootElement
        ?.querySelector<HTMLElement>(`[data-tab-id='${tabId}']`)
        ?.focus();
    }
  });

  const contextService: TabsContext = {
    selectTab$,
    isTabSelected$,
    isPanelSelected$,
    updateTabState$,
    getNextServerAssignedTabIndex$,
    getNextServerAssignedPanelIndex$,
    getMatchedPanelId$,
    getMatchedTabId$,
    isIndexSelected$,
    reIndexTabs$,
    onTabKeyDown$,
    selectIfAutomatic$,
  };

  useContextProvider(tabsContextId, contextService);

  useVisibleTask$(function buildTabsInfoVisibleTask({ track }) {
    track(() => shouldReIndexTabsSig.value);

    if (!shouldReIndexTabsSig.value) {
      return;
    }
    shouldReIndexTabsSig.value = false;

    if (!ref.value) {
      return;
    }
    const tabsRootElement = ref.value;

    const tabListElement = tabsRootElement.querySelector('[role="tablist"]');
    let tabElements: Element[] = [];
    if (tabListElement) {
      tabElements = Array.from(tabListElement?.children).filter((child) => {
        return child.getAttribute('role') === 'tab';
      });
    }

    let tabPanelElements: Element[] = [];
    if (tabsRootElement.children) {
      tabPanelElements = Array.from(tabsRootElement.children).filter(
        (child) => {
          return child.getAttribute('role') === 'tabpanel';
        }
      );
    }

    // See if the deleted index was the last one
    let lastTabWasSelectedPreviously = false;
    if (selectedIndexSig.value === tabPairsList.length - 1) {
      lastTabWasSelectedPreviously = true;
    }

    tabPairsList.length = 0;

    let deletedTabId: string | undefined = undefined;

    tabElements.forEach((tab, index) => {
      const tabId = tab.getAttribute('data-tab-id');
      const isDisabled = tab.hasAttribute('disabled');

      if (!tabId) {
        throw new Error('Missing tab id for tab: ' + index);
      }

      // clear all lists and maps
      let thisTabWasDeleted = true;
      // TODO: delete object maps, or turn into Map()

      if (selectedTabIdSig.value === '') {
        thisTabWasDeleted = false;
      } else if (tabId === selectedTabIdSig.value) {
        selectedIndexSig.value = index;
        thisTabWasDeleted = false;
      }

      const tabPanelElement = tabPanelElements[index];
      if (!tabPanelElement) {
        throw new Error('Missing tab panel for tab: ' + index);
      }
      const tabPanelId = tabPanelElement.getAttribute('data-tabpanel-id');
      if (tabId && tabPanelId) {
        tabPairsList.push({ tabId, tabPanelId });

        tabsMap[tabId] = {
          tabId,
          tabPanelId,
          index,
          disabled: isDisabled,
        };

        tabPanelsMap[tabPanelId] = {
          tabId,
          tabPanelId,
          index,
        };
      } else {
        throw new Error('Missing tab id or tab panel id for tab: ' + index);
      }

      if (thisTabWasDeleted) {
        deletedTabId = tabId;
      }
    });

    if (tabPairsList.length > 0) {
      if (lastTabWasSelectedPreviously && deletedTabId) {
        selectedIndexSig.value = tabPairsList.length - 1;
      }
      selectedTabIdSig.value = tabPairsList[selectedIndexSig.value].tabId;
    }
  });

  return (
    <div ref={ref} {...props}>
      <Slot />
    </div>
  );
});
