import {
  component$,
  useSignal,
  useContext,
  useVisibleTask$,
  $,
  type Signal,
  type QwikKeyboardEvent,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

export type InputProps = QwikIntrinsicElements['input'];

// Add required context here
export const AutocompleteInput = component$((props: InputProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);

  /* 
    previously had useTask here, but noticed whenever it first renders, 
    it won't focus the first option when hitting the down arrow key to open the listbox
    Also, all of our tests break on useTask, BUT it seems to work fine in the browser with useTask.
    Very odd.
  */
  useVisibleTask$(({ track }) => {
    track(() => contextService.inputValue.value);

    contextService.filteredOptions = contextService.options.filter(
      (option: Signal) => {
        const optionValue = option.value.getAttribute('optionValue');
        const inputValue = contextService.inputValue.value;

        if (
          contextService.inputValue.value.length >= 0 &&
          document.activeElement === ref.value
        ) {
          if (optionValue === inputValue) {
            contextService.isExpanded.value = false;
          } else if (optionValue.match(new RegExp(inputValue, 'i'))) {
            contextService.isExpanded.value = true;
          }
        } else {
          contextService.isExpanded.value = false;
        }

        return optionValue.match(new RegExp(inputValue, 'i'));
      }
    );

    // Probably better to refactor Signal type later
    contextService.options.map((option: Signal) => {
      if (
        !option.value
          .getAttribute('optionValue')
          .match(new RegExp(contextService.inputValue.value, 'i'))
      ) {
        option.value.style.display = 'none';
      } else {
        option.value.style.display = '';
      }
    });
  });

  return (
    <input
      data-autocomplete-input-id={contextService.inputId}
      ref={ref}
      role="combobox"
      id={contextService.inputId}
      aria-autocomplete="list"
      aria-controls={contextService.listBoxId}
      bind:value={contextService.inputValue}
      onKeyDown$={[
        $((e: QwikKeyboardEvent) => {
          if (e.key === 'ArrowDown') {
            contextService.isExpanded.value = true;
            contextService.filteredOptions[0]?.value?.focus();
          }
        }),
        props.onKeyDown$,
      ]}
      {...props}
    />
  );
});
