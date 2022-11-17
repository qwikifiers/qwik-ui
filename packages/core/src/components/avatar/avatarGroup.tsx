import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';

interface AvatarGroupProps {
  class?: string;
  className?: string;
}

export const AvatarGroup = component$((props: AvatarGroupProps) => {
  const cssClass = cn(
    'avatar-group',
    '-space-x-6',
    props.class,
    props.className
  );
  return (
    <div class={cssClass} {...props}>
      <Slot />
    </div>
  );
});
