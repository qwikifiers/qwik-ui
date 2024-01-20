import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/simple';

export default component$(() => {
  return (
    <section class="flex items-center justify-center gap-3">
      <Button variant="link">Link</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
    </section>
  );
});
