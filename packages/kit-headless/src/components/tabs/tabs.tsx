import {
  $,
  component$,
  createContextId,
  PropFunction,
  QRL,
  Signal,
  Slot,
  useContext,
  useContextProvider,
  useSignal,
  useVisibleTask$,
  useId,
  useStore,
} from '@builder.io/qwik';
import { tabsContextId } from './tabs-context-id';
import { TabsContext } from './tabs-context.type';
import { Behavior } from './behavior.type';

/**
 * TABS TODOs
 * - Get storybook testing to work
 *
 * - selectedIndex / default
 * - Orientation
 * - aria-label https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
 * - NOTE: Radix manually handle the value/id for each tab while we calculate it behind the scenes
 *    If we end up implementing this, we need to expose a way to set this value in the root
 * - keyboard interactions (arrowDown, ARrowRight, ArrowUp, ArrowLeft, Home, End, PageUp, PageDown)
 *    Support Loop
 * - expose selectedIndex in the root
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

export type TabIndexMap = [string, string][];
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
  const selectedTabPanelId = useSignal<string>('');
  const reIndexTabs = useSignal(false);

  const tabsIdsByIndex: TabIndexMap = [];
  const tabsAndPanels = useStore<TabPair[]>([]);
  const tabsInfo = useStore<TabInfo[]>([]);
  const infoByTabs = useStore<{ [key: string]: TabInfo }>({});
  const indexByTabId = useStore<{ [key: string]: number }>({}, { deep: true });
  const indexByTabPanelId = useStore<{ [key: string]: number }>({});

  const tabsChanged$ = $(() => {
    reIndexTabs.value = true;
  });

  const selectTab$ = $((tabId: string) => {
    selectedTabId.value = tabId;

    // const tabIndex = tabsIdsByIndex.findIndex(([id]) => id === tabId);
    // selectedIndex.value = tabIndex;
    // selectedTabPanelId.value = tabsIdsByIndex[tabIndex][1];
  });

  const ref = useSignal<HTMLElement | undefined>();

  const contextService: TabsContext = {
    indexByTabId,
    indexByTabPanelId,
    selectedIndex,
    selectTab$,
    tabsChanged$,
    behavior,
    selectedTabId,
    selectedTabPanelId,
  };

  const tabsInitialized = useSignal(false);

  console.log('tabsContextId', tabsContextId);
  useContextProvider(tabsContextId, contextService);

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
      const tabElements = ref.value.querySelectorAll(
        '[role="tablist"] > [role="tab"]'
      );
      console.log('tabElements', tabElements);
      const tabPanelElements = ref.value.querySelectorAll('[role="tabpanel"]');
      console.log('tabPanelElements.length', tabPanelElements.length);
      let lastSelectedTabId = undefined;

      tabElements.forEach((tab, index) => {
        const tabId = tab.getAttribute('data-tab-id');
        const tabForId = tab.getAttribute('data-for');

        if (!tabId) {
          throw new Error('Missing tab id for tab: ' + index);
        }
        if (indexByTabId[tabId] === selectedIndex.value) {
          lastSelectedTabId = tabId;
        }
        const tabPanelElement = tabPanelElements[index];
        if (!tabPanelElement) {
          throw new Error('Missing tab panel for tab: ' + index);
        }
        const tabPanelId = tabPanelElement.getAttribute('data-tabpanel-id');
        if (tabId && tabPanelId) {
          indexByTabId[tabId] = index;
          indexByTabPanelId[tabPanelId] = index;
          tabsIdsByIndex.push([tabId, tabPanelId]);
          tabsAndPanels.push({ tabId, tabPanelId });
        } else {
          throw new Error('Missing tab id or tab panel id for tab: ' + index);
        }
      });

      // Update selected index
      if (lastSelectedTabId) {
        selectedIndex.value = indexByTabId[lastSelectedTabId];
      } else {
        selectedIndex.value = 0;
      }
    }
  });

  useVisibleTask$(() => {
    tabsInitialized.value = true;
  });

  return (
    <div
      ref={ref}
      {...props}
      style={'visibility:' + tabsInitialized.value ? 'visible' : 'hidden'}
    >
      <Slot />
    </div>
  );
});
