import { component$, useStyles$ } from '@builder.io/qwik';
import { Button } from '@qwik-ui/material';

import styles from './index.scss?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <>
      <h2>This is the documentation for the Button</h2>
      <div class="flex flex-col gap-8 mt-4">
        <div>
          <h2>Basic Example</h2>
          <Button>SIMPLE BUTTON</Button>
        </div>
      </div>
    </>
  );
});
