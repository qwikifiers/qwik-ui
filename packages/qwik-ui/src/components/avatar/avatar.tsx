import { component$, Slot } from '@builder.io/qwik';
import { Size } from '../../types/types';

interface AvatarProps {
  size?: Size;
  hasRoundedCorners?: boolean;
  hasRing?: boolean;
  isCircle?: boolean;
}

export const Avatar = component$(({ size = 'w-24', hasRoundedCorners = false, hasRing = false, isCircle = false, ...props }: AvatarProps) => {
  return (
    <div class="avatar" {...props}>
      <div class={`${size} ${hasRoundedCorners ? 'rounded' : ''} ${hasRing ? 'ring ring-primary' : ''} ${isCircle ? 'rounded-full' : ''}`}>
        <Slot />
      </div>
    </div>
  );
});
