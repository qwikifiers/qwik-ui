import { component$, Slot } from '@builder.io/qwik';

interface CollapseTitleProps {
  class?: string;
  className?: string;
}

export const CollapseTitle = component$((props: CollapseTitleProps) => {
  return (
    <div className="collapse-title" {...props}>
      <Slot />
    </div>
  );
});
