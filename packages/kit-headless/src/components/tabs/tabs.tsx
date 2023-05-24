import {
  $,
  component$,
  Slot,
  useContextProvider,
  useSignal,
  useVisibleTask$,
  useStore,
} from '@builder.io/qwik';
import { tabsContextId } from './tabs-context-id';
import { TabsContext } from './tabs-context.type';
import { Behavior } from './behavior.type';

/**
 * TABS TODOs
 * 
 * - CHANGE THE querySelector to "scoped" queries
 * - selectedIndex / default
* - expose selectedIndex in the root 
* - Orientation
 * - aria-label https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
 * - NOTE: Radix manually handle the value/id for each tab while we calculate it behind the scenes
 *    If we end up implementing this, we need to expose a way to set this value in the root
 * - keyboard interactions (arrowDown, ARrowRight, ArrowUp, ArrowLeft, Home, End, PageUp, PageDown)
 *    Support Loop
 * - onValueChange
 * POST V1:
 * - RTL

 *
 * TAB
 *  Disable
 *  NOTE: radix / headlessui: expose data-state data-disable data-orientation
 *  NOTE: Headless UI: explorer the render props
 *  NOTE: remove tab, switch position
 *  NOTE: scrolling support? or multiple lines? (probably not for headless but for tailwind / material )
 *
 * PANEL
 *
 * aria Tabs Pattern https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 * a11y lint plugin https://www.npmjs.com/package/eslint-plugin-jsx-a11y
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
  index?: number | undefined;
}

export const Tabs = component$((props: TabsProps) => {
  const behavior = props.behavior ?? 'manual';
  const selectedIndex = useSignal(props.selectedIndex || 0);
  const selectedTabId = useSignal<string>('');
  const reIndexTabs = useSignal(false);
  const showTabsSignal = useSignal(false);
  const tabPairs = useStore<TabPair[]>([]);

  const tabsMap = useStore<{ [key: string]: TabInfo }>({});

  const tabPanelsMap = useStore<{ [key: string]: TabInfo }>({});

  const tabsChanged$ = $(() => {
    reIndexTabs.value = true;
  });

  const selectTab$ = $((tabId: string) => {
    selectedTabId.value = tabId;
  });

  const showTabs$ = $(() => {
    showTabsSignal.value = true;
  });

  const contextService: TabsContext = {
    tabsMap,
    tabPanelsMap,
    selectedIndex,
    selectTab$,
    showTabs$,
    tabsChanged$,
    behavior,
    selectedTabId,
  };

  useContextProvider(tabsContextId, contextService);

  const ref = useSignal<HTMLElement | undefined>();
  // useVisibleTask$(({ track }) => {
  //   track(() => selectedIndex.value);
  //   if (tabsIdsByIndex[selectedIndex.value]) {
  //     const currentSelectedTab = tabsIdsByIndex[selectedIndex.value][0];

  //     if (currentSelectedTab !== selectedTabId.value) {
  //       selectTab$(currentSelectedTab);
  //     }
  //   }
  // });

  useVisibleTask$(({ track }) => {
    track(() => reIndexTabs.value);

    if (!reIndexTabs.value) {
      return;
    }
    reIndexTabs.value = false;

    if (ref.value) {
      // TODO: Write a failing test for nested tabs to prove this querySelector should be scoped
      const tabElements = ref.value.querySelectorAll(
        '[role="tablist"] > [role="tab"]'
      );

      /*
      const parentElement = document.querySelector('#parent');

      const firstLevelElements = Array.from(parentElement.childNodes)
        .filter(node => node.nodeType === Node.ELEMENT_NODE && node.parentNode === parentElement);

      */

      const tabPanelElements = ref.value.querySelectorAll('[role="tabpanel"]');

      // See if the deleted index was the last one
      let previousSelectedTabWasLastOne = false;
      if (selectedIndex.value === tabPairs.length - 1) {
        previousSelectedTabWasLastOne = true;
      }

      tabPairs.length = 0;
      tabsMap;

      tabElements.forEach((tab, index) => {
        const tabId = tab.getAttribute('data-tab-id');

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
