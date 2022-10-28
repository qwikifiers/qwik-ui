import { Meta } from '@storybook/html';
import { Dropdown } from './dropdown';
import {DropdownTrigger} from "./dropdownTrigger";
import {DropdownContent} from "./dropdownContent";
import {DropdownItem} from "./dropdownItem";

export default {
  title: 'Dropdown',
} as Meta;

const Template = (args: any) => <Dropdown {...args}>
  <DropdownTrigger>Open dropdown</DropdownTrigger>
  <DropdownContent>
    <DropdownItem>item 1</DropdownItem>
    <DropdownItem>item 2</DropdownItem>
  </DropdownContent>
</Dropdown>;

export const Default = Template.bind({});


