import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/fluffy';

export default component$(() => {
  return (
    <section class="flex items-center justify-center gap-3">
      <Button intent="primary" size="sm">
        Small
      </Button>
      <Button intent="secondary" size="md">
        Medium
      </Button>
      <Button intent="danger" size="lg">
        Large
      </Button>
    </section>
  );
});
