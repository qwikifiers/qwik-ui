import { Slot, component$, useContext } from '@builder.io/qwik';
import { modalContextId } from './modal-context';

export const ModalTitle = component$(() => {
  const context = useContext(modalContextId);

  const titleId = `${context.localId}-title`;

  return (
    <h2 id={titleId}>
      <Slot />
    </h2>
  );
});
