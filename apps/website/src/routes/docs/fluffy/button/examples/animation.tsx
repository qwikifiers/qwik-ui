import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/fluffy';

export default component$(() => {
  return (
    <section class="flex items-center justify-center gap-3">
      <Button animation="none">None</Button>
      <Button animation="bouncy">Bouncy</Button>
    </section>
  );
});
