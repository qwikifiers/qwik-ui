import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <>
      <Button look="link">Link</Button>
      <Button look="ghost">Ghost</Button>
      <Button look="outline">Outline</Button>
    </>
  );
});
