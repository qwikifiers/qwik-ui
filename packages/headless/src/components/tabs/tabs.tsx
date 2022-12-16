import {
  component$,
  createContext,
  Signal,
  Slot,
  $,
  QRL,
  useContext,
  useContextProvider,
  useSignal,
  useMount$,
  PropFunction,
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
  class?: string;
}

export const Tabs = component$(
  ({ behavior = 'manual', ...props }: TabsProps) => {
    const lastTabIndex = useSignal(0);
    const lastPanelIndex = useSignal(0);

    const tabsHash = `${Math.random() * 1000}`;

    const getNextTabIndex = $(() => {
      return lastTabIndex.value++;
    });

    const getNextPanelIndex = $(() => {
      return lastPanelIndex.value++;
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
      <div {...props}>
        <Slot />
      </div>
    );
  }
);

interface TabListProps {
  labelledBy?: string;
  behavior?: 'automatic' | 'manual';
}

// List of tabs that can be clicked to show different content.
export const TabList = component$((props: TabListProps) => {
  const { labelledBy, ...rest } = props;
  return (
    <div role="tablist" aria-labelledby={labelledBy} {...rest}>
      <Slot />
    </div>
  );
});

interface TabProps {
  onClick?: PropFunction<(clicked: number) => void>;
  class?: string;
}

// Tab button inside of a tab list
export const Tab = component$(({ onClick, ...props }: TabProps) => {
  const contextService = useContext(tabsContext);
  const thisTabIndex = useSignal(0);

  useMount$(async () => {
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
      id={`${contextService.tabsHash}-tab-${thisTabIndex.value}`}
      type="button"
      role="tab"
      onFocus$={selectIfAutomatic}
      onMouseEnter$={selectIfAutomatic}
      aria-selected={isSelected()}
      aria-controls={`tabpanel-${thisTabIndex.value}`}
      class={`${isSelected() ? 'selected' : ''}${
        props.class ? ` ${props.class}` : ''
      }`}
      onClick$={$(() => {
        contextService.selectedIndex.value = thisTabIndex.value;
        if (onClick) {
          onClick(thisTabIndex.value);
        }
      })}
    >
      <Slot />
    </button>
  );
});

interface TabPanelProps {
  class?: string;
}

// Tab Panel implementation
export const TabPanel = component$(({ ...props }: TabPanelProps) => {
  const { class: className, ...rest } = props;
  const contextService = useContext(tabsContext);
  const thisPanelIndex = useSignal(0);
  const isSelected = () =>
    thisPanelIndex.value === contextService.selectedIndex.value;
  useMount$(async () => {
    thisPanelIndex.value = await await contextService.getNextPanelIndex();
  });
  return (
    <div
      id={`${contextService.tabsHash}-tabpanel-${thisPanelIndex}`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`tab-${thisPanelIndex}`}
      class={`${isSelected() ? 'is-hidden' : ''}${
        className ? ` ${className}` : ''
      }`}
      style={isSelected() ? 'display: block' : 'display: none'}
      {...rest}
    >
      <Slot />
    </div>
  );
});
