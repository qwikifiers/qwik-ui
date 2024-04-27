import { component$, useStyles$ } from '@builder.io/qwik';
import {
  Select,
  SelectPopover,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
  SelectOptionLabel,
} from '@qwik-ui/headless';
import styles from '../snippets/select.css?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <Select class="select">
      <SelectTrigger class="select-trigger">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectPopover class="select-popover">
        <SelectListbox class="select-listbox">
          <SelectOption>
            <SelectOptionLabel>Option 1</SelectOptionLabel>
          </SelectOption>
          <SelectOption>
            <SelectOptionLabel>Option 2</SelectOptionLabel>
          </SelectOption>
        </SelectListbox>
      </SelectPopover>
    </Select>
  );
});
