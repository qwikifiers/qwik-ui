import {
  component$,
  useSignal,
  useContext,
  Slot,
  type QwikIntrinsicElements
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

export type AutocompleteControlProps = QwikIntrinsicElements['div'];

export const AutocompleteControl = component$((props: AutocompleteControlProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);

  return (
    <div ref={ref} {...props}>
      <Slot />
    </div>
  );
});
