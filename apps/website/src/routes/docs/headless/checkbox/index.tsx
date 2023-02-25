import {
  component$,
  useStyles$,
  $,
  QwikMouseEvent,
  QwikChangeEvent,
} from '@builder.io/qwik';
import styles from './checkbox.css?inline';
import { Checkbox } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  return (
    <div class="grid gap-4">
      <h2>This is the documentation for the Checkbox</h2>

      <h1>Checkbox</h1>
      <Checkbox.Label htmlFor="test">
        <Checkbox.Root
          id="test"
          name="test"
          value="test"
          onChange={$(() => console.log('clicked'))}
          class="mr-2"
        />
        test
      </Checkbox.Label>

      <h1>With label</h1>
      <Checkbox.Label htmlFor="test">
        <Checkbox.Root class="mr-2" />
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
      <fieldset class="">
        <Checkbox.Root disabled checked class="qui-checkbox-sm" />
        <Checkbox.Root disabled checked class="qui-checkbox-md ml-3" />
        <Checkbox.Root disabled checked class="qui-checkbox-lg ml-3" />
      </fieldset>

      <h1>With legend</h1>
      <fieldset>
        <legend>group</legend>
        <Checkbox.Root disabled checked class="qui-checkbox-sm mr-2" />
        <Checkbox.Root disabled checked class="qui-checkbox-md mr-2" />
        <Checkbox.Root disabled checked class="qui-checkbox-lg mr-2" />
      </fieldset>

      <h1>With legend group</h1>
      <legend>group</legend>
      <fieldset>
        <Checkbox.Label htmlFor="test">
          <Checkbox.Root disabled checked class="qui-checkbox-sm mr-2" />
          test
        </Checkbox.Label>
      </fieldset>
      <fieldset>
        <Checkbox.Label htmlFor="test">
          <Checkbox.Root disabled checked class="qui-checkbox-sm mr-2" />
          test
        </Checkbox.Label>
      </fieldset>
      <fieldset>
        <Checkbox.Label htmlFor="test">
          <Checkbox.Root disabled checked class="qui-checkbox-sm mr-2" />
          test
        </Checkbox.Label>
      </fieldset>
    </div>
  );
});
