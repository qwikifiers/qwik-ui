import { component$, useStyles$ } from '@builder.io/qwik';
import {
  Select,
  SelectPopover,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';
import styles from './select.css?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <Select class="select">
      <SelectTrigger class="select-trigger">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectPopover class="select-popover">
        <SelectListbox class="select-listbox">
          <SelectOption>Option 1</SelectOption>
          <SelectOption>Option 2</SelectOption>
        </SelectListbox>
      </SelectPopover>
    </Select>
  );
});
