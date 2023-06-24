import {
  PropFunction,
  component$,
  useContext,
  useId,
  Slot,
  useComputed$,
  useTask$,
  $,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { tabsContextId } from './tabs-context-id';
import { KeyCode } from '../../utils/key-code.type';
import { isBrowser, isServer } from '@builder.io/qwik/build';

export interface TabProps {
  onClick?: PropFunction<() => void>;
  class?: string;
  selectedClassName?: string;
  disabled?: boolean;
}

export const Tab = component$((props: TabProps) => {
  const contextService = useContext(tabsContextId);
  const isSelectedSig = useSignal(false);
  const serverAssignedIndexSig = useSignal<number | undefined>(undefined);
  const matchedTabPanelIdSig = useSignal<string | undefined>(undefined);
  const uniqueTabId = useId();

  // Index task
  useTask$(async ({ cleanup }) => {
    if (isServer) {
      serverAssignedIndexSig.value =
        await contextService.getNextServerAssignedTabIndex$();
    }

    if (isBrowser) {
      contextService.reIndexTabs$();
    }
    cleanup(() => {
      contextService.reIndexTabs$();
    });
  });

  // is selected task
  useTask$(async ({ track }) => {
    if (isServer) {
      isSelectedSig.value = await contextService.isIndexSelected$(
        serverAssignedIndexSig.value
      );
      return;
    }
    isSelectedSig.value = await track(() =>
      contextService.isTabSelected$(uniqueTabId)
    );
  });

  // disabled task
  useTask$(({ track }) => {
    track(() => props.disabled);

    if (props.disabled) {
      contextService.updateTabState$(uniqueTabId, { disabled: true });
    }
  });

  // matched panel id task
  useVisibleTask$(async ({ track }) => {
    matchedTabPanelIdSig.value = await track(() =>
      contextService.getMatchedPanelId$(uniqueTabId)
    );
  });

  const selectTab$ = $(() => {
    if (props.disabled) {
      return;
    }
    contextService.selectTab$(uniqueTabId);
  });

  const selectIfAutomatic$ = $(() => {
    if (contextService.behavior === 'automatic') {
      selectTab$();
    }
  });

  return (
    <button
      id={'tab-' + uniqueTabId}
      data-tab-id={uniqueTabId}
      type="button"
      role="tab"
      disabled={props.disabled}
      aria-disabled={props.disabled}
      onFocus$={selectIfAutomatic$}
      onMouseEnter$={selectIfAutomatic$}
      aria-selected={isSelectedSig.value}
      tabIndex={isSelectedSig.value ? 0 : -1}
      aria-controls={'tabpanel-' + matchedTabPanelIdSig.value}
      class={`${
        isSelectedSig.value ? `selected ${props.selectedClassName || ''}` : ''
      }${props.class ? ` ${props.class}` : ''}`}
      onClick$={() => {
        selectTab$();
        if (props.onClick) {
          props.onClick();
        }
      }}
      onKeyDown$={(e) => {
        contextService.onTabKeyDown$(
          e.key as KeyCode,
          (e.target as any).getAttribute('data-tab-id')
        );
      }}
    >
      <Slot />
    </button>
  );
});
