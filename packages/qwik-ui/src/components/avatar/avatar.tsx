import { component$, Slot } from '@builder.io/qwik';

interface AvatarProps {
  src: string;
}

export const Avatar = component$(({ src }: AvatarProps) => {
  return (
    <div class="avatar">
      <div class="w-24 rounded">
        <img src={src} />
      </div>
    </div>
  );
});
