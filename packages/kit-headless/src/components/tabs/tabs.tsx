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
  getNextTabIndex: QRL<() => number>;
  getNextPanelIndex: QRL<() => number>;
  behavior: Behavior;
}

export const tabsContextId = createContextId<TabsContext>('qui--tabList');

export interface TabsProps {
  behavior?: Behavior;
  class?: string;
}

export const Tabs = component$((props: TabsProps) => {
  const behavior = props.behavior ?? 'manual';
  const lastTabIndex = useSignal(0);
  const lastPanelIndex = useSignal(0);

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
    behavior,
  };

  useContextProvider(tabsContextId, contextService);

  return (
    <div {...props}>
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
  return (
    <div role="tablist" aria-labelledby={labelledBy} {...rest}>
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
  ({ selectedClassName, onClick, ...props }: TabProps) => {
    const contextService = useContext(tabsContextId);
    const thisTabIndex = useSignal(0);

    useVisibleTask$(async () => {
      thisTabIndex.value = await contextService.getNextTabIndex();
      console.log('useVisibleTask$', thisTabIndex.value);
    });

    // TODO: Ask Manu about this 😊
    const isSelected = () =>
      thisTabIndex.value === contextService.selectedIndex.value;

    const selectIfAutomatic = $(() => {
      if (contextService.behavior === 'automatic') {
        contextService.selectedIndex.value = thisTabIndex.value;
      }
    });

    return (
      <button
        id={useId()}
        type="button"
        role="tab"
        onFocus$={selectIfAutomatic}
        onMouseEnter$={selectIfAutomatic}
        aria-selected={isSelected()}
        aria-controls={`tabpanel-${thisTabIndex.value}`}
        class={`${isSelected() ? `selected ${selectedClassName}` : ''}${
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
    thisPanelIndex.value = await contextService.getNextPanelIndex();
  });
  return (
    <div
      id={useId()}
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
