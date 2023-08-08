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
import { KeyCode } from '../../utils/key-code.type';
import { TAB_PANEL_ID_PREFIX } from './tab-panel';
import { tabsContextId } from './tabs-context-id';

export const TAB_ID_PREFIX = 'tab-';

export type TabProps = {
  onClick$?: (event: QwikMouseEvent) => void;
  selectedClassName?: string;

  disabled?: boolean;
  /** @deprecated Internal use only */
  _tabId?: string;
  /** @deprecated Internal use only */
  _index?: number;
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
  const contextService = useContext(tabsContextId);

  const elementRefSig = useSignal<HTMLElement | undefined>();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tabId = props._tabId!;
  const fullTabElementId = contextService.tabsPrefix + TAB_ID_PREFIX + tabId;
  const fullPanelElementId = contextService.tabsPrefix + TAB_PANEL_ID_PREFIX + tabId;

  const selectedClassNameSig = useComputed$(() => {
    return props.selectedClassName || contextService.selectedClassName;
  });

  const isSelectedSig = useComputed$(() => {
    return contextService.selectedIndexSig.value === props._index;
  });

  useTask$(function disabledTask({ track }) {
    track(() => props.disabled);

    if (props.disabled) {
      contextService.updateTabState$(tabId, { disabled: true });
    }
  });

  useVisibleTask$(function preventDefaultOnKeysVisibleTask({ cleanup }) {
    function handler(event: KeyboardEvent) {
      if (preventedKeys.includes(event.key as KeyCode)) {
        event.preventDefault();
      }
      contextService.onTabKeyDown$(event.key as KeyCode, tabId);
    }
    elementRefSig.value?.addEventListener('keydown', handler);
    cleanup(() => {
      elementRefSig.value?.removeEventListener('keydown', handler);
    });
  });

  const selectIfAutomatic$ = $(() => {
    contextService.selectIfAutomatic$(tabId);
  });

  return (
    <button
      type="button"
      role="tab"
      id={fullTabElementId}
      data-tab-id={fullTabElementId}
      ref={elementRefSig}
      disabled={props.disabled}
      aria-disabled={props.disabled}
      onFocus$={selectIfAutomatic$}
      onMouseEnter$={selectIfAutomatic$}
      aria-selected={isSelectedSig.value}
      tabIndex={isSelectedSig.value ? 0 : -1}
      aria-controls={fullPanelElementId}
      style={props.style}
      class={[
        (props.class as Signal<string>)?.value ?? (props.class as string),
        isSelectedSig.value && ['selected', selectedClassNameSig.value]
      ]}
      onClick$={async (event) => {
        await contextService.selectTab$(tabId);
        if (props.onClick$) {
          await props.onClick$(event);
        }
      }}
    >
      <Slot />
    </button>
  );
});
