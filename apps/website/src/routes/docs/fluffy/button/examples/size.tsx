import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/simple';

export default component$(() => {
  return (
    <section class="flex items-center justify-center gap-8">
      <Button size="xs">Button</Button>
      <Button size="sm">Button</Button>
      <Button>Button</Button>
      <Button size="lg">Button</Button>
    </section>
  );
});
