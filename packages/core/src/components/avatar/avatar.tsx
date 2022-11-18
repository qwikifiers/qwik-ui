import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { Size, WithClassesProp } from '../../types';

interface AvatarProps extends WithClassesProp {
  size?: Size;
  hasRoundedCorners?: boolean;
  hasRing?: boolean;
  isCircle?: boolean;
}

export const Avatar = component$(
  ({
    size = 'w-24',
    hasRoundedCorners = false,
    hasRing = false,
    isCircle = false,
    class: classProp = '',
    className = '',
    ...props
  }: AvatarProps) => {
    const cssClass = cn('avatar', classProp, className);
    return (
      <div class={cssClass} {...props}>
        <div
          class={`${size} ${hasRoundedCorners ? 'rounded' : ''} ${
            hasRing ? 'ring ring-primary' : ''
          } ${isCircle ? 'rounded-full' : ''}`}
        >
          <Slot />
        </div>
      </div>
    );
  }
);
