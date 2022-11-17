import { component$, Slot } from '@builder.io/qwik';
import { Size } from '../../types/types';
import cn from 'classnames';

interface AvatarProps {
  size?: Size;
  hasRoundedCorners?: boolean;
  hasRing?: boolean;
  isCircle?: boolean;
  class?: string;
  className?: string;
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
