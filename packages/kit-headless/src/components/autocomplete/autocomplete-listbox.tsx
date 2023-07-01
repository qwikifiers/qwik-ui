import {
  $,
  useSignal,
  useContext,
  component$,
  Slot,
  type QwikIntrinsicElements,
  type QwikKeyboardEvent,
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

export type ListboxProps = {
  isExpanded?: boolean;
} & QwikIntrinsicElements['ul'];

export const AutocompleteListbox = component$((props: ListboxProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);
  const listboxId = contextService.listBoxId;
  contextService.listBoxRef = ref;

  return (
    <ul
      id={listboxId}
      ref={ref}
      style={`
          display: ${
            contextService.isExpanded.value ? 'block' : 'none'
          }; position: absolute; z-index: 1; ${props.style}
      `}
      role="listbox"
      {...props}
      // aria-label={!contextService.labelRef.value ? contextService.inputValue.value : undefined}
      onKeyDown$={[
        $((e: QwikKeyboardEvent) => {
          const availableOptions = contextService.filteredOptions.map(
            (option) => option.value
          );

          const target = e.target as HTMLElement;
          const currentIndex = availableOptions.indexOf(target);

          if (e.key === 'ArrowDown') {
            if (currentIndex === availableOptions.length - 1) {
              availableOptions[0]?.focus();
            } else {
              availableOptions[currentIndex + 1]?.focus();
            }
          }

          if (e.key === 'ArrowUp') {
            if (currentIndex <= 0) {
              availableOptions[availableOptions.length - 1]?.focus();
            } else {
              availableOptions[currentIndex - 1]?.focus();
            }
          }

          if (e.key === 'Home') {
            availableOptions[0]?.focus();
          }

          if (e.key === 'End') {
            availableOptions[availableOptions.length - 1]?.focus();
          }
        }),
        props.onKeyDown$,
      ]}
    >
      <Slot />
    </ul>
  );
});
