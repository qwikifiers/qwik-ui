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

      <h1>With label default</h1>
      <div>
        <Checkbox label="test" />
      </div>
      <h1>With label start</h1>
      <div>
        <Checkbox label="test" labelPosition="end" />
      </div>
      <h1>Size</h1>

      <div>
        <Checkbox class="checkbox-xs" checked />
        <Checkbox class="checkbox-sm" checked />
        <Checkbox class="checkbox-md" checked />
        <Checkbox class="checkbox-lg" checked />
      </div>
      <h1>Disabled</h1>

      <div>
        <Checkbox disabled checked />
      </div>
      <h1>Disabled</h1>

      <div>
        <Checkbox disabled checked />
      </div>
    </div>
  );
});
