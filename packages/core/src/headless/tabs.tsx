import {
  component$,
  createContext,
  useServerMount$,
  Signal,
  Slot,
  $,
  QRL,
  useContext,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';

export type Behavior = 'automatic' | 'manual';

interface TabsContext {
  selectedIndex: Signal<number>;
  getNextTabIndex: QRL<() => number>;
  getNextPanelIndex: QRL<() => number>;
  tabsHash: string;
  behavior: Behavior;
}

export const tabsContext = createContext<TabsContext>('tabList');

export interface TabsProps {
  behavior?: Behavior;
}

export const Tabs = component$(({ behavior = 'automatic' }: TabsProps) => {
  const lastTabIndex = useSignal(-1);
  const lastPanelIndex = useSignal(-1);

  const tabsHash = `${Math.random() * 1000}`;

  const getNextTabIndex = $(() => {
    return ++lastTabIndex.value;
  });

  const getNextPanelIndex = $(() => {
    return ++lastPanelIndex.value;
  });

  const selected = useSignal(0);

  const contextService: TabsContext = {
    selectedIndex: selected,
    getNextTabIndex,
    getNextPanelIndex,
    tabsHash,
    behavior,
  };

  useContextProvider(tabsContext, contextService);

  return (
    <div>
      <Slot />
    </div>
  );
});

interface TabListProps {
  labelledBy?: string;
  behavior?: 'automatic' | 'manual';
}

// List of tabs that can be clicked to show different content.
export const TabList = component$((props?: TabListProps) => {
  return (
    <div role="tablist" aria-labelledby={props?.labelledBy} onClick$={() => {}}>
      <Slot />
    </div>
  );
});

// Tab button inside of a tab list
export const Tab = component$(() => {
  const contextService = useContext(tabsContext);
  const thisTabIndex = useSignal(0);

  useServerMount$(async () => {
    thisTabIndex.value = await await contextService.getNextTabIndex();
  });
  const isSelected = () =>
    thisTabIndex.value === contextService.selectedIndex.value;

  const selectIfAutomatic = $(() => {
    if (contextService.behavior === 'automatic') {
      contextService.selectedIndex.value = thisTabIndex.value;
    }
  });

  return (
    <button
      id={`${contextService.tabsHash}-tab-${thisTabIndex}`}
      type="button"
      role="tab"
      onFocus$={selectIfAutomatic}
      onMouseOver$={selectIfAutomatic}
      aria-selected={isSelected()}
      aria-controls={`tabpanel-${thisTabIndex}`}
      class={{ selected: isSelected() }}
      onClick$={() => {
        contextService.selectedIndex.value = thisTabIndex.value;
      }}
    >
      <Slot />
    </button>
  );
});

// Tab Panel
export const TabPanel = component$(() => {
  const contextService = useContext(tabsContext);
  const thisPanelIndex = useSignal(0);
  const isSelected = () =>
    thisPanelIndex.value === contextService.selectedIndex.value;
  useServerMount$(async () => {
    thisPanelIndex.value = await await contextService.getNextPanelIndex();
  });
  return (
    <div
      id={`${contextService.tabsHash}-tabpanel-${thisPanelIndex}`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`tab-${thisPanelIndex}`}
      class={isSelected() ? 'is-hidden' : ''}
      style={isSelected() ? 'display: block' : 'display: none'}
    >
      <Slot />
    </div>
  );
});
