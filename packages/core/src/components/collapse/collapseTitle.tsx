import { component$, Slot } from '@builder.io/qwik';

interface CollapseTitleProps {
  class?: string;
  className?: string;
}

export const CollapseTitle = component$((props: CollapseTitleProps) => {
  return (
    <div class="collapse-title" {...props}>
      <Slot />
    </div>
  );
});
