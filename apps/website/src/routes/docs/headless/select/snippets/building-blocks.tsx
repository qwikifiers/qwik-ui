import { component$ } from '@builder.io/qwik';
import {
  Select,
  SelectTrigger,
  SelectListbox,
  SelectOption,
  SelectPopover,
} from '@qwik-ui/headless';

export default component$(() => (
  <Select>
    <SelectTrigger>Trigger</SelectTrigger>
    <SelectPopover>
      <SelectListbox>
        <SelectOption>option</SelectOption>
      </SelectListbox>
    </SelectPopover>
  </Select>
));
