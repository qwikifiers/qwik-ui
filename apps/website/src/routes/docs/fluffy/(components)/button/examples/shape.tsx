import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/fluffy';

export default component$(() => {
  return (
    <section class="flex items-center justify-center gap-3">
      <Button intent="primary" shape="rounded">
        Rounded
      </Button>
      <Button intent="primary" shape="circular">
        Circular
      </Button>
      <Button intent="primary" shape="square">
        Square
      </Button>
    </section>
  );
});
