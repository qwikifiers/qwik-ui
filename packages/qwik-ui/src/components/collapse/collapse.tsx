import { component$, Slot } from '@builder.io/qwik';

interface CollapseProps {
  class?: string;
  className?: string;
  showArrow?: boolean;
  showPlus?: boolean;
}

export const Collapse = component$(({ showArrow = false, showPlus = false, ...props }: CollapseProps) => {
  return (
    <div tabIndex={0} className={`collapse border border-base-300 bg-base-100 rounded-box ${showArrow && !showPlus && 'collapse-arrow'} ${showPlus && !showArrow && 'collapse-plus'}`} {...props}>
      <input type="checkbox" />
      <Slot />
    </div>
  );
});
