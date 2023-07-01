import {
  component$,
  $,
  Slot,
  useContext,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

export type ButtonProps = QwikIntrinsicElements['button'];

export const AutocompleteButton = component$((props: ButtonProps) => {
  const contextService = useContext(AutocompleteContextId);
  const buttonId = contextService.buttonId;
  const listboxId = contextService.listBoxId;

  return (
    <button
      {...props}
      id={buttonId}
      aria-expanded={contextService.isExpanded.value}
      aria-label="listbox toggle button"
      aria-haspopup="listbox"
      aria-controls={listboxId}
      // add their own custom onClick with our onClick functionality
      onClick$={[
        $(
          () =>
            (contextService.isExpanded.value = !contextService.isExpanded.value)
        ),
        props.onClick$,
      ]}
      tabIndex={-1}
    >
      <Slot />
    </button>
  );
});
