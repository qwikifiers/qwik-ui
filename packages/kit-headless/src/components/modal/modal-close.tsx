import { PropsOf, Slot, component$, useContext, $ } from '@builder.io/qwik';
import { modalContextId } from './modal-context';

export const HModalClose = component$((props: PropsOf<'button'>) => {
  const context = useContext(modalContextId);

  const handleClick$ = $(() => {
    context.showSig.value = false;
  });

  return (
    <button type="button" onClick$={[handleClick$, props.onClick$]} {...props}>
      <Slot />
    </button>
  );
});
