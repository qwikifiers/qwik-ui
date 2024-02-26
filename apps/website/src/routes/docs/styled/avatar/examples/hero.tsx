import { component$ } from '@builder.io/qwik';
import { Avatar, AvatarFallback, AvatarImage } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/mhevery.png" alt="@mhevery" />
      <AvatarFallback>MA</AvatarFallback>
    </Avatar>
  );
});
