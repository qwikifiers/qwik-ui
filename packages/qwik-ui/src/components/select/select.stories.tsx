import { $ } from '@builder.io/qwik';
import { Meta } from '@storybook/html';
import { Select } from './select';

export default {
  title: 'Data input / Select',
  argTypes: {
    placeholder: { control: 'text' },
    options: { control: 'object' },
  },
} as Meta;

const Template = (args: any) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Choose one number',
  options: ['one', 'two', 'three'],
  onChange: $((evt: Event) => console.log(evt)),
};
