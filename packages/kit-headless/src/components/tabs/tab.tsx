import {
  $,
  PropsOf,
  Slot,
  component$,
  useComputed$,
  useContext,
  useSignal,
  sync$,
} from '@builder.io/qwik';
import { TAB_PANEL_ID_PREFIX } from './tab-panel';
import { tabsContextId } from './tabs-context-id';
import { KeyCode } from '../../utils/key-code.type';

export const TAB_ID_PREFIX = '_tab_';

export type TabProps = PropsOf<'button'> & {
  disabled?: boolean;
  selected?: boolean;
  selectedClassName?: string;
  tabId?: string;
};

export const Tab = component$<TabProps>(({ selectedClassName, tabId, ...props }) => {
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

  const selectIfAutomatic$ = $(() => {
    contextService.selectIfAutomatic$(tabId!);
  });

  const classNamesSig = useComputed$(() => [
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
      data-state={isSelectedSig.value ? 'selected' : 'unselected'}
      onFocus$={[selectIfAutomatic$, props.onFocus$]}
      onMouseEnter$={[selectIfAutomatic$, props.onMouseEnter$]}
      aria-selected={isSelectedSig.value}
      tabIndex={isSelectedSig.value ? 0 : -1}
      class={[props.class, classNamesSig.value]}
      onClick$={[$(() => contextService.selectTab$(tabId!)), props.onClick$]}
      onKeyDown$={[
        /* KeyCode cannot be used here. */
        sync$((e: KeyboardEvent): void => {
          const keys = [
            'Home',
            'End',
            'PageDown',
            'PageUp',
            'ArrowDown',
            'ArrowUp',
            'ArrowLeft',
            'ArrowRight',
          ];

          if (keys.includes(e.key)) {
            e.preventDefault();
          }
        }),
        $((e) => contextService.onTabKeyDown$(e.key as KeyCode, tabId!)),
        props.onKeyDown$,
      ]}
    >
      <Slot />
    </button>
  );
});
