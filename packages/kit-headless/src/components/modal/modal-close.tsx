import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { modalContextId } from './modal-context';

export const ModalClose = component$((props: PropsOf<'button'>) => {
  const context = useContext(modalContextId);

  return (
    <button onClick$={() => (context.showSig.value = false)} {...props}>
      <Slot />
    </button>
  );
});
