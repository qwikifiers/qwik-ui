import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/fluffy';

export default component$(() => {
  return (
    <section class="flex items-center justify-center gap-3">
      <Button intent="primary" state="enabled">
        Enabled
      </Button>
      <Button intent="primary" state="disabled">
        Disabled
      </Button>
      <Button intent="primary" state="active">
        Active
      </Button>
    </section>
  );
});
