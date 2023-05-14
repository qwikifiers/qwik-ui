import {
  PropFunction,
  component$,
  useContext,
  useId,
  Slot,
  useComputed$,
  useTask$,
  $,
  useVisibleTask$,
  useSignal,
} from '@builder.io/qwik';
import { tabsContextId } from './tabs-context-id';

export interface TabProps {
  for: string;
  onClick?: PropFunction<() => void>;
  class?: string;
  selectedClassName?: string;
}

// Tab button inside of a tab list
export const Tab = component$((props: TabProps) => {
  const contextService = useContext(tabsContextId);

  const uniqueId = useId();

  const currentTabIndex = useSignal(0);

  const isSelectedSignal = useSignal(false);

  useTask$(({ cleanup }) => {
    contextService.tabsChanged$();

    cleanup(() => {
      contextService.tabsChanged$();
    });
  });

  useTask$(({ track }) => {
    track(contextService.indexByTabId);
    console.log('contextService.indexByTabId', contextService.indexByTabId);
    currentTabIndex.value = contextService.indexByTabId[uniqueId];
  });

  useVisibleTask$(() => {
    console.log(
      'contextService.selectedIndex.value',
      contextService.selectedIndex.value
    );
    console.log('currentTabIndex.value', currentTabIndex.value);
    isSelectedSignal.value =
      contextService.selectedIndex.value === currentTabIndex.value;
  });

  const selectTab$ = $(() => {
    contextService.selectedIndex.value = currentTabIndex.value;
  });

  const selectIfAutomatic$ = $(() => {
    if (contextService.behavior === 'automatic') {
      selectTab$();
    }
  });

  return (
    <button
      data-for={props.for}
      data-tab-id={uniqueId}
      type="button"
      role="tab"
      onFocus$={selectIfAutomatic$}
      onMouseEnter$={selectIfAutomatic$}
      aria-selected={isSelectedSignal.value}
      aria-controls={'tabpanel-' + props.for}
      class={`${isSelectedSignal ? `selected ${props.selectedClassName}` : ''}${
        props.class ? ` ${props.class}` : ''
      }`}
      onClick$={async () => {
        await selectTab$();
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      <Slot />
    </button>
  );
});
