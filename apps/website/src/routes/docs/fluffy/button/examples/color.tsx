import { PropsOf, component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/simple';

export default component$<PropsOf<typeof Button>>(() => {
  return (
    <section class="flex items-center justify-center gap-6">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="warning">Warning</Button>
      <Button color="alert">Alert</Button>
      <Button color="success">Success</Button>
    </section>
  );
});
