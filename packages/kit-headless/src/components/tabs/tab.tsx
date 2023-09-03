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
  type Signal,
} from '@builder.io/qwik';
import { KeyCode } from '../../utils/key-code.type';
import { TAB_PANEL_ID_PREFIX } from './tab-panel';
import { tabsContextId } from './tabs-context-id';

export const TAB_ID_PREFIX = '_tab_';

export type TabProps = {
  disabled?: boolean;
  selected?: boolean;
  selectedClassName?: string;
  tabId?: string;

  /** @deprecated Internal use only */
  _extraClass?: QwikIntrinsicElements['div']['class'];
  /** @deprecated Internal use only */
} & QwikIntrinsicElements['button'];

export const preventedKeys = [
  KeyCode.Home,
  KeyCode.End,
  KeyCode.PageDown,
  KeyCode.PageUp,
  KeyCode.ArrowDown,
  KeyCode.ArrowUp,
  KeyCode.ArrowLeft,
  KeyCode.ArrowRight,
];

export const Tab = component$(
  ({ selectedClassName, _extraClass, tabId, ...props }: TabProps) => {
    const contextService = useContext(tabsContextId);

    const elementRefSig = useSignal<HTMLElement | undefined>();

    const fullTabElementId = contextService.tabsPrefix + TAB_ID_PREFIX + tabId!;
    const fullPanelElementId = contextService.tabsPrefix + TAB_PANEL_ID_PREFIX + tabId!;

    const selectedClassNameSig = useComputed$(() => {
      return selectedClassName || contextService.selectedClassName;
    });

    const isSelectedSig = useComputed$(() => {
      return contextService.selectedTabIdSig.value === tabId;
    });

    useVisibleTask$(function preventDefaultOnKeysVisibleTask({ cleanup }) {
      function handler(event: KeyboardEvent) {
        if (preventedKeys.includes(event.key as KeyCode)) {
          event.preventDefault();
        }
        contextService.onTabKeyDown$(event.key as KeyCode, tabId!);
      }
      // TODO put the listener on TabList
      elementRefSig.value?.addEventListener('keydown', handler);
      cleanup(() => {
        elementRefSig.value?.removeEventListener('keydown', handler);
      });
    });

    const selectIfAutomatic$ = $(() => {
      contextService.selectIfAutomatic$(tabId!);
    });

    const classNamesSig = useComputed$(() => [
      (_extraClass as Signal<string>)?.value ?? (_extraClass as string),
      // TODO only given class if selected
      isSelectedSig.value && ['selected', selectedClassNameSig.value],
    ]);

    return (
      <button
        {...props}
        type="button"
        role="tab"
        id={fullTabElementId}
        aria-controls={fullPanelElementId}
        ref={elementRefSig}
        aria-disabled={props.disabled}
        onFocus$={[selectIfAutomatic$, props.onFocus$]}
        onMouseEnter$={[selectIfAutomatic$, props.onMouseEnter$]}
        aria-selected={isSelectedSig.value}
        tabIndex={isSelectedSig.value ? 0 : -1}
        class={[
          (props.class as Signal<string>)?.value ?? (props.class as string),
          classNamesSig.value,
        ]}
        onClick$={[$(() => contextService.selectTab$(tabId!)), props.onClick$]}
      >
        <Slot />
      </button>
    );
  },
);
