import {component$, Slot} from '@builder.io/qwik';

interface CardContentProps {
  class?: string;
  className?: string;
}

export const CardContent = component$((props : CardContentProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
