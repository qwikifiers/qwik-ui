import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <>
      <section class="flex items-center justify-center gap-8">
        <Button size="sm">Button</Button>
        <Button>Button</Button>
        <Button size="lg">Button</Button>
      </section>
    </>
  );
});
