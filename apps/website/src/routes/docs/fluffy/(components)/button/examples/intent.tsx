import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/fluffy';

export default component$(() => {
  return (
    <section class="flex items-center justify-center gap-3">
      <Button intent="basic">Basic</Button>
      <Button intent="primary">Primary</Button>
      <Button intent="secondary">Secondary</Button>
      <Button intent="danger">Danger</Button>
    </section>
  );
});
