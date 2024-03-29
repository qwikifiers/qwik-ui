import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/styled';
import { LuGithub } from '@qwikest/icons/lucide';

export default component$(() => {
  return (
    <Button size="icon">
      <LuGithub />
    </Button>
  );
});
