import { component$ } from '@builder.io/qwik';
import {
  Select,
  SelectPopover,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectListbox,
  SelectOption,
} from '@qwik-ui/headless';

export default component$(() => (
  <Select>
    <SelectTrigger>
      <SelectValue>selected value</SelectValue>
    </SelectTrigger>

    <SelectPopover>
      <SelectListbox>
        <SelectOption>regular option</SelectOption>

        {/* optional */}
        <SelectGroup>
          <SelectLabel>group label</SelectLabel>
          <SelectOption>group option</SelectOption>
        </SelectGroup>
      </SelectListbox>
    </SelectPopover>
  </Select>
));
