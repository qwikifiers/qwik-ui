import { component$, Slot } from '@builder.io/qwik';
import { WithClassesProp } from '../../types';

interface CardContentProps extends WithClassesProp {}

export const CardContent = component$((props: CardContentProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
