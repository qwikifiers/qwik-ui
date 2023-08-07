import {
  $,
  Slot,
  component$,
  useComputed$,
  useContext,
  useSignal,
  useTask$,
  useVisibleTask$,
  type QwikIntrinsicElements,
  type QwikMouseEvent,
  type Signal
} from '@builder.io/qwik';
import { isBrowser, isServer } from '@builder.io/qwik/build';
import { KeyCode } from '../../utils/key-code.type';
import { tabsContextId } from './tabs-context-id';

export type TabProps = {
  onClick$?: (event: QwikMouseEvent) => void;
  selectedClassName?: string;
  disabled?: boolean;
  /** @deprecated Internal use only */
  tabId?: string;
} & QwikIntrinsicElements['button'];

export const preventedKeys = [
  KeyCode.Home,
  KeyCode.End,
  KeyCode.PageDown,
  KeyCode.PageUp,
  KeyCode.ArrowDown,
  KeyCode.ArrowUp,
  KeyCode.ArrowLeft,
  KeyCode.ArrowRight
];

export const Tab = component$((props: TabProps) => {
  console.log('Tab', props);
  const contextService = useContext(tabsContextId);
  const isSelectedSig = useSignal(false);
  const serverAssignedIndexSig = useSignal<number | undefined>(undefined);
  const elementRefSig = useSignal<HTMLElement | undefined>();
  const uniqueTabId = props.tabId!;

  const selectedClassNameSig = useComputed$(() => {
    return props.selectedClassName || contextService.selectedClassName;
  });

  useTask$(async function indexInitTask({ cleanup }) {
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

  useTask$(async function isSelectedTask({ track }) {
    const isTabSelected = await track(() => contextService.isTabSelected$(uniqueTabId));
    if (isServer && !props.disabled) {
      isSelectedSig.value = await contextService.isIndexSelected$(
        serverAssignedIndexSig.value
      );
      return;
    }
    isSelectedSig.value = isTabSelected;
  });

  useTask$(function disabledTask({ track }) {
    track(() => props.disabled);

    if (props.disabled) {
      contextService.updateTabState$(uniqueTabId, { disabled: true });
    }
  });

  useVisibleTask$(function preventDefaultOnKeysVisibleTask({ cleanup }) {
    function handler(event: KeyboardEvent) {
      if (preventedKeys.includes(event.key as KeyCode)) {
        event.preventDefault();
      }
      contextService.onTabKeyDown$(event.key as KeyCode, uniqueTabId);
    }
    elementRefSig.value?.addEventListener('keydown', handler);
    cleanup(() => {
      elementRefSig.value?.removeEventListener('keydown', handler);
    });
  });

  const selectIfAutomatic$ = $(() => {
    contextService.selectIfAutomatic$(uniqueTabId);
  });

  return (
    <button
      id={'tab-' + uniqueTabId}
      data-tab-id={uniqueTabId}
      type="button"
      role="tab"
      ref={elementRefSig}
      disabled={props.disabled}
      aria-disabled={props.disabled}
      onFocus$={selectIfAutomatic$}
      onMouseEnter$={selectIfAutomatic$}
      aria-selected={isSelectedSig.value}
      tabIndex={isSelectedSig.value ? 0 : -1}
      aria-controls={'tabpanel-' + uniqueTabId}
      class={[
        (props.class as Signal<string>)?.value ?? (props.class as string),
        isSelectedSig.value && ['selected', selectedClassNameSig.value]
      ]}
      onClick$={[props.onClick$, () => contextService.selectTab$(uniqueTabId)]}
      style={props.style}
    >
      button
      <Slot />
    </button>
  );
});
