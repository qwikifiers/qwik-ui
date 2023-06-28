import {
  Slot,
  useSignal,
  useContext,
  component$,
  $,
  type QwikIntrinsicElements,
  type QwikKeyboardEvent,
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

export type OptionProps = {
  optionValue: string;
  disabled?: boolean;
} & QwikIntrinsicElements['li'];

export const AutocompleteOption = component$((props: OptionProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);

  contextService.options = [...contextService.options, ref];

  return (
    <li
      ref={ref}
      role="option"
      tabIndex={props.disabled ? -1 : 0}
      aria-disabled={props.disabled}
      onClick$={[
        $(() => {
          if (!props.disabled) {
            contextService.inputValue.value = props.optionValue;
            contextService.isExpanded.value = false;
          }
        }),
        props.onClick$,
      ]}
      onKeyDown$={[
        $((e: QwikKeyboardEvent) => {
          if ((e.key === 'Enter' || e.key === ' ') && !props.disabled) {
            contextService.inputValue.value = props.optionValue;
            contextService.isExpanded.value = false;
            contextService.focusInput$(contextService.inputId);
          }
        }),
        props.onKeyDown$,
      ]}
      {...props}
    >
      <Slot />
    </li>
  );
});
