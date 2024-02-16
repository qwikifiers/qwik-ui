import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="alert">Alert</Button>
    </>
  );
});
