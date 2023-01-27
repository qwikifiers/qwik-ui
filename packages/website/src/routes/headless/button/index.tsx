import { component$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Button</h2>
      <Button class="...." disabled={true}>
        ciao
      </Button>
    </>
  );
});
