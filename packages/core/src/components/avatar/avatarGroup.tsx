import { component$, Slot } from '@builder.io/qwik';

interface AvatarGroupProps {
  class?: string;
  className?: string;
}

export const AvatarGroup = component$((props: AvatarGroupProps) => {
  return (
    <div class="avatar-group -space-x-6" {...props}>
      <Slot />
    </div>
  );
});
