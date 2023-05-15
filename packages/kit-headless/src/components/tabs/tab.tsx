import {
  PropFunction,
  component$,
  useContext,
  useId,
  Slot,
  useComputed$,
  useTask$,
  $,
} from '@builder.io/qwik';
import { tabsContextId } from './tabs-context-id';

export interface TabProps {
  onClick?: PropFunction<() => void>;
  class?: string;
  selectedClassName?: string;
}

export const Tab = component$((props: TabProps) => {
  const contextService = useContext(tabsContextId);

  const uniqueId = useId();

  useTask$(({ cleanup }) => {
    contextService.tabsChanged$();

    cleanup(() => {
      contextService.tabsChanged$();
    });
  });

  const isSelectedSignal = useComputed$(() => {
    return (
      contextService.selectedIndex.value ===
      contextService.tabsMap[uniqueId]?.index
    );
  });

  // TODO: Figure out a way to fix this shitty hack :)
  useTask$(({ track }) => {
    track(() => isSelectedSignal.value);

    if (isSelectedSignal.value) {
      contextService.showTabs$();
    }
  });

  const selectTab$ = $(() => {
    contextService.selectedIndex.value =
      contextService.tabsMap[uniqueId]?.index || 0;
  });

  const selectIfAutomatic$ = $(() => {
    if (contextService.behavior === 'automatic') {
      selectTab$();
    }
  });

  return (
    <button
      id={'tab-' + uniqueId}
      data-tab-id={uniqueId}
      type="button"
      role="tab"
      onFocus$={selectIfAutomatic$}
      onMouseEnter$={selectIfAutomatic$}
      aria-selected={isSelectedSignal.value}
      tabIndex={isSelectedSignal.value ? 0 : -1}
      aria-controls={'tabpanel-' + contextService.tabsMap[uniqueId]?.tabPanelId}
      class={`${
        isSelectedSignal.value ? `selected ${props.selectedClassName}` : ''
      }${props.class ? ` ${props.class}` : ''}`}
      onClick$={() => {
        selectTab$();
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      <Slot />
    </button>
  );
});
