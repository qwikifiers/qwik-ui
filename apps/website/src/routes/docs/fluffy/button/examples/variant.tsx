import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/simple';

export default component$(() => {
  return (
    <section class="flex items-center justify-center gap-3">
      <Button look="link">Link</Button>
      <Button look="ghost">Ghost</Button>
      <Button look="outline">Outline</Button>
    </section>
  );
});
