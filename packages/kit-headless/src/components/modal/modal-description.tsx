import { Slot, component$, useContext } from '@builder.io/qwik';
import { modalContextId } from './modal-context';

export const ModalDescription = component$(() => {
  const context = useContext(modalContextId);

  const descriptionId = `${context.localId}-description`;

  return (
    <p id={descriptionId}>
      <Slot />
    </p>
  );
});
