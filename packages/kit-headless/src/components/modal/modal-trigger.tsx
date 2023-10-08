import {
  $,
  Slot,
  component$,
  useContext,
  useOn,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { tabbable } from 'tabbable';
import { modalContextId } from './modal-context-id';

export const ModalTrigger = component$(() => {
  const modalContext = useContext(modalContextId);
  const modalTriggerContainerSig = useSignal<HTMLDivElement>();

  useOn(
    'click',
    $(function openModal() {
      modalContext.showSig.value = true;
    }),
  );

  useVisibleTask$(function focusOnModalClose({ track }) {
    const isOpen = track(() => modalContext.showSig.value);
    const modalTriggerContainer = modalTriggerContainerSig.value;

    if (isOpen || !modalTriggerContainer) {
      return;
    }

    const [trigger] = tabbable(modalTriggerContainer);
    console.log('huhuhu', trigger);

    trigger?.focus();
  });

  return (
    <div ref={modalTriggerContainerSig}>
      <Slot />
    </div>
  );
});
