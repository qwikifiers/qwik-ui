import {
  $,
  component$,
  Slot,
  useContextProvider,
  useSignal,
  useVisibleTask$,
  useStore,
  useTask$,
} from '@builder.io/qwik';
import { tabsContextId } from './tabs-context-id';
import { TabsContext } from './tabs-context.type';
import { Behavior } from './behavior.type';
import { KeyCode } from '../../utils/key-code.type';

/**
 * TABS TODOs
 *
 * - onSelectedIndexChange
 * - Orientation
 * - keyboard interactions (arrowDown, ArrowUp,  - and home, pagedown, up and end for vertical)

* aria Tabs Pattern https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 * a11y lint plugin https://www.npmjs.com/package/eslint-plugin-jsx-a11y
  


* POST V1:
 * - RTL
 *  NOTE: scrolling support? or multiple lines? (probably not for headless but for tailwind / material )
 * Add ability to close tabs with an ❌ icon (and keyboard support)

 *
 */

export interface TabsProps {
  behavior?: Behavior;
  class?: string;
  selectedIndex?: number;
}

export interface TabPair {
  tabId: string;
  tabPanelId: string;
}

export interface TabInfo {
  tabId: string;
  tabPanelId?: string;
  index?: number;
  disabled?: boolean;
}

export const Tabs = component$((props: TabsProps) => {
  const behavior = props.behavior ?? 'manual';

  const ref = useSignal<HTMLElement | undefined>();
  const selectedIndex = useSignal(0);

  useTask$(({ track }) => {
    track(() => props.selectedIndex);
    selectedIndex.value = props.selectedIndex || 0;
  });

  const selectedTabId = useSignal<string>('');
  const reIndexTabs = useSignal(false);
  const showTabsSignal = useSignal(false);
  const tabPairs = useStore<TabPair[]>([]);

  const tabsMap = useStore<{ [key: string]: TabInfo }>({});

  const tabPanelsMap = useStore<{ [key: string]: TabInfo }>({});

  const onTabsChanged$ = $(() => {
    reIndexTabs.value = true;
  });

  const selectTab$ = $((tabId: string) => {
    selectedTabId.value = tabId;
  });

  const showTabs$ = $(() => {
    showTabsSignal.value = true;
  });

  const onTabKeyDown$ = $((key: KeyCode, tabId: string) => {
    const tabsRootElement = ref.value;

    const enabledTabs = tabPairs.filter((tabPair) => {
      return !tabsMap[tabPair.tabId].disabled;
    });
    const currentFocusedTabIndex = enabledTabs.findIndex(
      (tabPair) => tabPair.tabId === tabId
    );

    if (key === KeyCode.ArrowRight) {
      let nextTabId = enabledTabs[0].tabId;

      if (currentFocusedTabIndex < tabPairs.length - 1) {
        nextTabId = enabledTabs[currentFocusedTabIndex + 1].tabId;
      }
      tabsRootElement
        ?.querySelector<HTMLElement>(`[data-tab-id='${nextTabId}']`)
        ?.focus();
    }

    if (key === KeyCode.ArrowLeft) {
      let previousTabId = enabledTabs[enabledTabs.length - 1].tabId;

      if (currentFocusedTabIndex !== 0) {
        previousTabId = enabledTabs[currentFocusedTabIndex - 1].tabId;
      }
      tabsRootElement
        ?.querySelector<HTMLElement>(`[data-tab-id='${previousTabId}']`)
        ?.focus();
    }

    if (key === KeyCode.Home || key === KeyCode.PageUp) {
      tabsRootElement
        ?.querySelector<HTMLElement>(`[data-tab-id='${enabledTabs[0].tabId}']`)
        ?.focus();
    }

    if (key === KeyCode.End || key === KeyCode.PageDown) {
      tabsRootElement
        ?.querySelector<HTMLElement>(
          `[data-tab-id='${enabledTabs[enabledTabs.length - 1].tabId}']`
        )
        ?.focus();
    }
  });

  const contextService: TabsContext = {
    tabsMap,
    tabPanelsMap,
    selectedIndex,
    selectTab$,
    showTabs$,
    onTabsChanged$,
    behavior,
    selectedTabId,
    onTabKeyDown$,
  };

  useContextProvider(tabsContextId, contextService);

  useVisibleTask$(({ track }) => {
    track(() => reIndexTabs.value);

    if (!reIndexTabs.value) {
      return;
    }
    reIndexTabs.value = false;

    if (ref.value) {
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
      let previousSelectedTabWasLastOne = false;
      if (selectedIndex.value === tabPairs.length - 1) {
        previousSelectedTabWasLastOne = true;
      }

      tabPairs.length = 0;
      tabsMap;

      tabElements.forEach((tab, index) => {
        const tabId = tab.getAttribute('data-tab-id');
        const isDisabled = tab.hasAttribute('disabled');

        if (!tabId) {
          throw new Error('Missing tab id for tab: ' + index);
        }

        // clear all lists and maps
        let tabWasDeleted = true;
        // TODO: delete object maps, or turn into Map()

        if (tabId === selectedTabId.value) {
          selectedIndex.value = index;
          tabWasDeleted = false;
        }

        const tabPanelElement = tabPanelElements[index];
        if (!tabPanelElement) {
          throw new Error('Missing tab panel for tab: ' + index);
        }
        const tabPanelId = tabPanelElement.getAttribute('data-tabpanel-id');
        if (tabId && tabPanelId) {
          tabPairs.push({ tabId, tabPanelId });

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

        if (tabPairs.length > 0) {
          if (previousSelectedTabWasLastOne && tabWasDeleted) {
            selectedIndex.value = tabPairs.length - 1;
          }
          selectedTabId.value = tabPairs[selectedIndex.value].tabId;
        }
      });
    }
  });

  return (
    <div
      ref={ref}
      {...props}
      style={'visibility:' + (showTabsSignal.value ? 'visible' : 'hidden')}
    >
      <Slot />
    </div>
  );
});
