import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Checkbox } from '@qwik-ui/theme-daisy';

export default component$(() => {
  useStylesScoped$(`
    h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
    .container { width: 300px }
  `);

  return (
    <div class="container">
      <h2>This is the documentation for the Checkbox</h2>

      <h1>Checkbox Example</h1>
      <Checkbox />
    </div>
  );
});
