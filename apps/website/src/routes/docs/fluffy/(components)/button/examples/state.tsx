import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/fluffy';

export default component$(() => {
  return (
    <section class="flex justify-center gap-3">
      <Button state="enabled">Enabled</Button>
      <Button state="disabled">Disabled</Button>
      <Button state="active">Active</Button>
    </section>
  );
});
