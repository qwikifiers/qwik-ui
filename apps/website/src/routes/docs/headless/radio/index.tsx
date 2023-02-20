import { component$, useStyles$ } from '@builder.io/qwik';
import { Radio } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <div class="flex flex-col gap-3 mt-2">
      <h2>This is the documentation for the Radio</h2>
      <h3>Basic Example </h3>
      <Radio name="one" />
      <Radio name="one" />
      <Radio name="one" />
    </div>
  );
});
