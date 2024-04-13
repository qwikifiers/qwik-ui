import { component$, Slot, type PropsOf } from '@builder.io/qwik';
import { VisuallyHidden } from '../../utils/visually-hidden';

export const ModalTitle = component$((props: PropsOf<'h2'>) => {
  // TODO: replace this with a polymorphic component
  return (
    <VisuallyHidden>
      <h2 {...props}>
        <Slot />
      </h2>
    </VisuallyHidden>
  );
});
