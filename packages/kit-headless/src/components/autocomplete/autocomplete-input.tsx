import {
  $,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
  type QwikIntrinsicElements,
  type QwikKeyboardEvent,
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

import { KeyCode } from '../../utils/key-code.type';

const autocompletePreventedKeys = [
  KeyCode.Home,
  KeyCode.End,
  KeyCode.PageDown,
  KeyCode.PageUp,
  KeyCode.ArrowDown,
  KeyCode.ArrowUp,
];

export type InputProps = QwikIntrinsicElements['input'];

// Add required context here
export const AutocompleteInput = component$((props: InputProps) => {
  const inputRefSig = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);
  const listboxId = contextService.listBoxId;
  const labelRef = contextService.labelRef;

  useVisibleTask$(function registerInputRefTask() {
    contextService.inputRefSig.value = inputRefSig.value;
  });

  useVisibleTask$(function preventDefaultTask({ cleanup }) {
    function keyHandler(e: KeyboardEvent) {
      if (autocompletePreventedKeys.includes(e.key as KeyCode)) {
        e.preventDefault();
      }
    }

    inputRefSig.value?.addEventListener('keydown', keyHandler);
    cleanup(() => {
      inputRefSig.value?.removeEventListener('keydown', keyHandler);
    });
  });

  return (
    <input
      data-autocomplete-input-id={contextService.inputId}
      ref={inputRefSig}
      role="combobox"
      aria-invalid={props['aria-invalid'] || false}
      id={contextService.inputId}
      aria-autocomplete="list"
      aria-haspopup="listbox"
      aria-controls={listboxId}
      aria-expanded={contextService.isTriggerExpandedSig.value}
      aria-disabled={props['aria-disabled'] || false}
      aria-label={labelRef.value ? undefined : contextService.inputValueSig.value}
      aria-required={props['aria-required'] || false}
      bind:value={contextService.inputValueSig}
      onKeyDown$={[
        $((e: QwikKeyboardEvent) => {
          if (e.key === 'ArrowDown') {
            contextService.isTriggerExpandedSig.value = true;
            contextService.filteredOptionsStore[0]?.value?.focus();
          }
        }),
        props.onKeyDown$,
      ]}
      onFocus$={() => {
        contextService.isInputFocusedSig.value = true;
      }}
      onBlur$={() => {
        contextService.isInputFocusedSig.value = false;
      }}
      {...props}
    />
  );
});
