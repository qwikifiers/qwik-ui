import { component$ } from '@builder.io/qwik';
import {
  SelectRoot,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectMarker,
  SelectListBox,
  SelectOption,
  SelectGroup,
} from '@qwik-ui/headless';

export default component$(() => (
  <SelectRoot>
    <SelectLabel>Content</SelectLabel>
    <SelectTrigger>
      <SelectValue>Content</SelectValue>
      <SelectMarker />
    </SelectTrigger>
    <SelectListBox>
      <SelectGroup>
        <SelectLabel>Options</SelectLabel>
        <SelectOption optionValue="value">value</SelectOption>
        <SelectOption optionValue="value">value</SelectOption>
        <SelectOption optionValue="value">value</SelectOption>
      </SelectGroup>
    </SelectListBox>
  </SelectRoot>
));
