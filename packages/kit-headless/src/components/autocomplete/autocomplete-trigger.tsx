import {
  component$,
  $,
  Slot,
  useContext,
  type QwikIntrinsicElements
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

export type TriggerProps = QwikIntrinsicElements['button'];

export const AutocompleteTrigger = component$(({ ...props }: TriggerProps) => {
  const contextService = useContext(AutocompleteContextId);
  const triggerId = contextService.triggerId;
  const listboxId = contextService.listBoxId;

  return (
    <button
      {...props}
      id={triggerId}
      aria-expanded={contextService.isExpanded.value}
      aria-label="listbox toggle trigger"
      aria-haspopup="listbox"
      aria-controls={listboxId}
      // add their own custom onClick with our onClick functionality
      onClick$={[
        $(() => (contextService.isExpanded.value = !contextService.isExpanded.value)),
        props.onClick$
      ]}
      tabIndex={-1}
    >
      <Slot />
    </button>
  );
});
