import { component$, useStyles$ } from '@builder.io/qwik';
import { Checkbox } from '@qwik-ui/headless';
import styles from './checkbox.css?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <div class="grid gap-4">
      <h2>This is the documentation for the Checkbox</h2>

      <h1>Check Example</h1>

      <Checkbox />
      <h1>Check Example</h1>

      <Checkbox checked />
      <h1>Check Example</h1>

      <Checkbox label="test" />
      <h1>Check Example</h1>

      <Checkbox label="test" disabled checked />

      <h1>Size</h1>

      <Checkbox disabled checked class="qui-checkbox-sm" />
      <Checkbox disabled checked class="qui-checkbox-md" />
      <Checkbox disabled checked class="qui-checkbox-lg" />
    </div>
  );
});
