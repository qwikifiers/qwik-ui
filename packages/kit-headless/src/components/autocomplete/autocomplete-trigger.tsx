import {
  component$,
  useSignal,
  useContext,
  Slot,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

export type AutocompleteTriggerProps = QwikIntrinsicElements['div'];

export const AutocompleteTrigger = component$(
  (props: AutocompleteTriggerProps) => {
    const ref = useSignal<HTMLElement>();
    const contextService = useContext(AutocompleteContextId);
    contextService.triggerRef = ref;

    return (
      <div ref={ref} {...props}>
        <Slot />
      </div>
    );
  }
);
