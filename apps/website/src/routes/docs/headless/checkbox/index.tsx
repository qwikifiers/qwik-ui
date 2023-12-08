import { component$, useStyles$, $ } from '@builder.io/qwik';
import styles from './checkbox.css?inline';
import { Checkbox } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  return (
    <div class="grid">
      <h2>This is the documentation for the Checkbox</h2>

      <h1>Checkbox</h1>

      <Checkbox.Label for="test">
        <Checkbox.Root
          id="test"
          name="test"
          value="test"
          onChange={$(() => console.log('clicked'))}
          class="checkbox-secondary checkbox-margin-right"
        />
        test
      </Checkbox.Label>

      <h1>With label</h1>
      <Checkbox.Label for="test">
        <Checkbox.Root class="checkbox-margin-right" />
        test
      </Checkbox.Label>

      <h1>Checked</h1>
      <fieldset>
        <Checkbox.Root checked />
      </fieldset>

      <h1>Disabled end checked</h1>
      <fieldset>
        <Checkbox.Root disabled checked />
      </fieldset>

      <h1>Size</h1>
      <fieldset>
        <Checkbox.Root disabled checked class="qui-checkbox-sm checkbox-margin-right" />
        <Checkbox.Root disabled checked class="qui-checkbox-md checkbox-margin-right" />
        <Checkbox.Root disabled checked class="qui-checkbox-lg" />
      </fieldset>

      <h1>With legend</h1>
      <fieldset>
        <legend>group</legend>
        <Checkbox.Root disabled checked class="qui-checkbox-sm checkbox-margin-right" />
        <Checkbox.Root disabled checked class="qui-checkbox-md checkbox-margin-right" />
        <Checkbox.Root disabled checked class="qui-checkbox-lg" />
      </fieldset>

      <h1>With legend group</h1>
      <legend>group</legend>
      <fieldset>
        <Checkbox.Label for="test">
          <Checkbox.Root disabled checked class="qui-checkbox-sm checkbox-margin-right" />
          test
        </Checkbox.Label>
      </fieldset>
      <fieldset>
        <Checkbox.Label for="test">
          <Checkbox.Root disabled checked class="qui-checkbox-sm checkbox-margin-right" />
          test
        </Checkbox.Label>
      </fieldset>
      <fieldset>
        <Checkbox.Label for="test">
          <Checkbox.Root disabled checked class="qui-checkbox-sm checkbox-margin-right" />
          test
        </Checkbox.Label>
      </fieldset>
    </div>
  );
});
