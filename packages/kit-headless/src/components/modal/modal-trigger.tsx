import { PropsOf, Slot, component$, useContext, $ } from '@builder.io/qwik';
import { modalContextId } from './modal-context';

export const ModalTrigger = component$((props: PropsOf<'button'>) => {
  const context = useContext(modalContextId);

  const handleClick$ = $(() => {
    context.showSig.value = !context.showSig.value;
  });

  return (
    <button onClick$={[handleClick$, props.onClick$]} {...props}>
      <Slot />
    </button>
  );
});
