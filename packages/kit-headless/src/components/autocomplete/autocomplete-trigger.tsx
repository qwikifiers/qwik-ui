import {
  component$,
  $,
  Slot,
  useContext,
  type QwikIntrinsicElements,
  useSignal,
  useVisibleTask$
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

export type TriggerProps = QwikIntrinsicElements['button'];

export const AutocompleteTrigger = component$(({ ...props }: TriggerProps) => {
  const contextService = useContext(AutocompleteContextId);
  const triggerId = contextService.triggerId;
  const listboxId = contextService.listBoxId;
  const triggerRefSig = useSignal<HTMLElement>();

  const isTriggerExpandedSig = contextService.isTriggerExpandedSig;

  useVisibleTask$(function focusInputTask({ track }) {
    if (track(() => !isTriggerExpandedSig.value)) {
      triggerRefSig.value?.focus();
    }
  });

  useVisibleTask$(function registerInputRefTask() {
    contextService.triggerRefSig.value = triggerRefSig.value;
  });

  return (
    <button
      {...props}
      ref={triggerRefSig}
      id={triggerId}
      aria-expanded={contextService.isTriggerExpandedSig.value}
      aria-label="listbox toggle trigger"
      aria-haspopup="listbox"
      aria-controls={listboxId}
      // add their own custom onClick with our onClick functionality
      onClick$={[
        $(() => {
          contextService.isTriggerExpandedSig.value =
            !contextService.isTriggerExpandedSig.value;
        }),
        props.onClick$
      ]}
      tabIndex={-1}
    >
      <Slot />
    </button>
  );
});
