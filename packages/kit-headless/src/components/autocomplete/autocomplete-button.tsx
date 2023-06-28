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

  return (
    <button
      {...props}
      aria-expanded={contextService.isExpanded.value}
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
