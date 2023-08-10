import {
  Slot,
  useSignal,
  useContext,
  component$,
  $,
  useVisibleTask$,
  type QwikIntrinsicElements,
  type QwikKeyboardEvent
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

export type OptionProps = {
  // optionValue: Record<string, any> | string;
  optionValue: string;
  disabled?: boolean;
} & QwikIntrinsicElements['li'];

export const AutocompleteOption = component$((props: OptionProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);

  // push optionValue instead of ref to store
  contextService.optionsStore = [...contextService.optionsStore, ref];

  return (
    <li
      ref={ref}
      role="option"
      tabIndex={props.disabled ? -1 : 0}
      aria-disabled={props.disabled}
      onClick$={[
        $(() => {
          if (!props.disabled) {
            contextService.inputValueSig.value = props.optionValue;
            contextService.isTriggerExpandedSig.value = false;
          }
        }),
        props.onClick$
      ]}
      onKeyDown$={[
        $((e: QwikKeyboardEvent) => {
          if ((e.key === 'Enter' || e.key === ' ') && !props.disabled) {
            contextService.inputValueSig.value = props.optionValue;
            contextService.isTriggerExpandedSig.value = false;
            contextService.focusInput$(contextService.inputId);
          }
        }),
        props.onKeyDown$
      ]}
      {...props}
    >
      <Slot />
    </li>
  );
});
