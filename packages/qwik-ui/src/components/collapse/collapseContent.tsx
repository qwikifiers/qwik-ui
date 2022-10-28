import { component$, Slot } from '@builder.io/qwik';

interface CollapseContentProps {
  class?: string;
  className?: string;
}

export const CollapseContent = component$((props: CollapseContentProps) => {
  return (
    <div className="collapse-content" {...props}>
      <Slot />
    </div>
  );
});
