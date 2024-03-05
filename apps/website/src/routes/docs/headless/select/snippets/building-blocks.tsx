import { component$ } from '@builder.io/qwik';
import {
  Select,
  SelectPopover,
  SelectTrigger,
  SelectValue,
  SelectListbox,
  SelectOption,
} from '@qwik-ui/headless';

export default component$(() => (
  <Select>
    <SelectTrigger>
      <SelectValue>Selected Value</SelectValue>
    </SelectTrigger>
    <SelectPopover>
      <SelectListbox>
        <SelectOption>option</SelectOption>
      </SelectListbox>
    </SelectPopover>
  </Select>
));
