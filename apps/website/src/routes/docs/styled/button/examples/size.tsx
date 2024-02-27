import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <>
      <Button size="sm">Button</Button>
      <Button>Button</Button>
      <Button size="lg">Button</Button>
    </>
  );
});
