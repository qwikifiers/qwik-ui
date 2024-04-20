import { component$, useStyles$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';

import { SVG } from '../examples/svg';
import styles from '../snippets/combobox.css?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <Combobox.Root class="combobox-root">
      <Combobox.Label>Ice Cream Flavors</Combobox.Label>
      <div class="combobox-control">
        <Combobox.Input class="combobox-input" />
        <Combobox.Trigger class="combobox-trigger">
          <SVG class="combobox-icon" />
        </Combobox.Trigger>
      </div>

      <Combobox.Popover class="combobox-popover">
        <Combobox.Listbox class="combobox-listbox">
          <Combobox.Option>Option 1</Combobox.Option>
        </Combobox.Listbox>
      </Combobox.Popover>
    </Combobox.Root>
  );
});
