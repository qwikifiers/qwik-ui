import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/simple';
import { LuGithub } from '@qwikest/icons/lucide';

export default component$(() => {
  return (
    <section class="flex items-center justify-center gap-3">
      <Button size="icon">
        <LuGithub />
      </Button>
    </section>
  );
});
