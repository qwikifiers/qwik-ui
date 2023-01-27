import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/theme-daisy';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Button</h2>
      <Button>Hello</Button>
      <hr/>
      <Button disabled={true}>Hello</Button>
    </>
  );
});
