import {
  Slot,
  useSignal,
  useContext,
  component$,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

export type AutocompleteLabelProps = QwikIntrinsicElements['label'];

export const AutocompleteLabel = component$((props: AutocompleteLabelProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);
  contextService.labelRef = ref;

  return (
    <label {...props} for={contextService.inputId}>
      <Slot />
    </label>
  );
});
