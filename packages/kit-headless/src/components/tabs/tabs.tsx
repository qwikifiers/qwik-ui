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
  useTask$,
  useSignal,
  useVisibleTask$,
  useId,
} from '@builder.io/qwik';

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
export type Behavior = 'automatic' | 'manual';

interface TabsContext {
  selectedIndex: Signal<number>;
  selectedTabId: Signal<string>;
  registerTab: QRL<(tabId: string) => void>;
  behavior: Behavior;
  reIndexTabs: Signal<boolean>;
  setTabIndex: QRL<(tabId: string, index: number) => void>;
}

export const tabsContextId = createContextId<TabsContext>('qui--tabList');

export interface TabsProps {
  behavior?: Behavior;
  class?: string;
  selectedIndex?: number;
}

export interface TabIndexMap {
  [key: string]: number | undefined;
}

export const Tabs = component$((props: TabsProps) => {
  const behavior = props.behavior ?? 'manual';
  const selectedIndex = useSignal(props.selectedIndex || 0);
  const reIndexTabs = useSignal(false);

  const tabsRegistry: TabIndexMap = {};

  const setTabIndex = $((tabId: string, index: number) => {
    tabsRegistry[tabId] = index;
  });

  const registerTab = $((tabId: string) => {
    tabsRegistry[tabId] = undefined;
    reIndexTabs.value = true;
  });

  const selectedTabId = useSignal('');

  const contextService: TabsContext = {
    selectedIndex,
    registerTab,
    setTabIndex,
    behavior,
    reIndexTabs,
    selectedTabId,
  };

  const tabsInitialized = useSignal(false);

  useContextProvider(tabsContextId, contextService);

  useVisibleTask$(() => {
    tabsInitialized.value = true;
  });

  return (
    <div
      {...props}
      style={'visibility:' + tabsInitialized.value ? 'visible' : 'hidden'}
    >
      <Slot />
    </div>
  );
});

interface TabListProps {
  labelledBy?: string;
  behavior?: 'automatic' | 'manual';
  class?: string;
}

// List of tabs that can be clicked to show different content.
export const TabList = component$((props: TabListProps) => {
  const { labelledBy, ...rest } = props;
  const contextService = useContext(tabsContextId);
  const ref = useSignal<Element | undefined>();

  useVisibleTask$(({ track }) => {
    track(() => contextService.reIndexTabs.value);

    if (ref.value) {
      ref.value.querySelectorAll('[role="tab"]').forEach((tab, index) => {
        const tabId = tab.getAttribute('id');

        if (tabId) {
          contextService.setTabIndex(tabId, index);
        }
      });
    }
  });

  return (
    <div ref={ref} role="tablist" aria-labelledby={labelledBy} {...rest}>
      <Slot />
    </div>
  );
});

interface TabProps {
  onClick?: PropFunction<(clicked: number) => void>;
  class?: string;
  selectedClassName?: string;
}

// Tab button inside of a tab list
export const Tab = component$(
  ({ selectedClassName, onClick, class: classString }: TabProps) => {
    const contextService = useContext(tabsContextId);
    const thisTabIndex = useSignal(0);

    const isSelected = () => forTab === contextService.selectedTabId.value;

    const selectIfAutomatic = $(() => {
      if (contextService.behavior === 'automatic') {
        contextService.selectedIndex.value = thisTabIndex.value;
      }
    });

    const id = useId();

    return (
      <button
        id={id}
        type="button"
        role="tab"
        onFocus$={selectIfAutomatic}
        onMouseEnter$={selectIfAutomatic}
        aria-selected={isSelected()}
        aria-controls={`tabpanel-${thisTabIndex.value}`}
        class={`${isSelected() ? `selected ${selectedClassName}` : ''}${
          classString ? ` ${classString}` : ''
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
  }
);

interface TabPanelProps {
  class?: string;
}

// Tab Panel implementation
export const TabPanel = component$(({ ...props }: TabPanelProps) => {
  const { class: classNames, ...rest } = props;
  const contextService = useContext(tabsContextId);
  const thisPanelIndex = useSignal(0);
  const isSelected = () =>
    thisPanelIndex.value === contextService.selectedIndex.value;
  useVisibleTask$(async () => {
    setTimeout(async () => {
      thisPanelIndex.value = await contextService.getNextPanelIndex();
    });
  });
  const uniqueId = useId();
  return (
    <div
      id={uniqueId}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`tab-${thisPanelIndex}`}
      class={`${isSelected() ? 'is-hidden' : ''}${
        classNames ? ` ${classNames}` : ''
      }`}
      style={isSelected() ? 'display: block' : 'display: none'}
      {...rest}
    >
      <p>thisPanelIndex.value: {thisPanelIndex.value} </p>
      <p>contextService.selectedIndex: {contextService.selectedIndex} </p>
      <Slot />
    </div>
  );
});
