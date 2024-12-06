import { component$ } from '@builder.io/qwik';
import { Avatar } from '~/components/ui';

export default component$(() => {
  return (
    <Avatar.Root>
      <Avatar.Image src="https://github.com/mhevery.png" alt="@mhevery" />
      <Avatar.Fallback>MA</Avatar.Fallback>
    </Avatar.Root>
  );
});
