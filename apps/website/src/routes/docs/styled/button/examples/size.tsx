import { component$ } from '@builder.io/qwik';
import { Button } from '~/components/ui';

export default component$(() => {
  return (
    <>
      <Button size="sm">Button</Button>
      <Button>Button</Button>
      <Button size="lg">Button</Button>
    </>
  );
});
