/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  $,
  Slot,
  component$,
  useComputed$,
  useContext,
  useSignal,
  useVisibleTask$,
  type QwikIntrinsicElements,
  type Signal
} from '@builder.io/qwik';
import { KeyCode } from '../../utils/key-code.type';
import { TAB_PANEL_ID_PREFIX } from './tab-panel';
import { tabsContextId } from './tabs-context-id';

export const TAB_ID_PREFIX = '_tab_';

export type TabProps = {
  disabled?: boolean;
  selectedClassName?: string;

  /** @deprecated Internal use only */
  _extraClass?: QwikIntrinsicElements['div']['class'];
  /** @deprecated Internal use only */
  _tabId?: string;
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

export const Tab = component$(
  ({ selectedClassName, _extraClass, _tabId, ...props }: TabProps) => {
    const contextService = useContext(tabsContextId);

    const elementRefSig = useSignal<HTMLElement | undefined>();

    const fullTabElementId = contextService.tabsPrefix + TAB_ID_PREFIX + _tabId!;
    const fullPanelElementId = contextService.tabsPrefix + TAB_PANEL_ID_PREFIX + _tabId!;

    const selectedClassNameSig = useComputed$(() => {
      return selectedClassName || contextService.selectedClassName;
    });

    const isSelectedSig = useComputed$(() => {
      return contextService.selectedTabIdSig.value === _tabId;
    });

    useVisibleTask$(function preventDefaultOnKeysVisibleTask({ cleanup }) {
      function handler(event: KeyboardEvent) {
        if (preventedKeys.includes(event.key as KeyCode)) {
          event.preventDefault();
        }
        contextService.onTabKeyDown$(event.key as KeyCode, _tabId!);
      }
      // TODO put the listener on TabList
      elementRefSig.value?.addEventListener('keydown', handler);
      cleanup(() => {
        elementRefSig.value?.removeEventListener('keydown', handler);
      });
    });

    const selectIfAutomatic$ = $(() => {
      contextService.selectIfAutomatic$(_tabId!);
    });

    return (
      <button
        {...props}
        type="button"
        role="tab"
        id={fullTabElementId}
        data-tab-id={fullTabElementId}
        ref={elementRefSig}
        aria-disabled={props.disabled}
        onFocus$={[selectIfAutomatic$, props.onFocus$]}
        onMouseEnter$={[selectIfAutomatic$, props.onMouseEnter$]}
        aria-selected={isSelectedSig.value}
        tabIndex={isSelectedSig.value ? 0 : -1}
        aria-controls={fullPanelElementId}
        class={[
          (props.class as Signal<string>)?.value ?? (props.class as string),
          (_extraClass as Signal<string>)?.value ?? (_extraClass as string),
          // TODO only given class if selected
          isSelectedSig.value && ['selected', selectedClassNameSig.value]
        ]}
        onClick$={[$(() => contextService.selectTab$(_tabId!)), props.onClick$]}
      >
        <Slot />
      </button>
    );
  }
);
