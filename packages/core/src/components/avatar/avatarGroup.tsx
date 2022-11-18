import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface AvatarGroupProps extends WithClassesProp {}

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
