import { Meta } from '@storybook/html';
import { $ } from '@builder.io/qwik';
import { Checkbox } from './checkbox';

export default {
  title: 'Data Input / Checkbox',
  argTypes: {
    checked: { control: 'boolean' },
    label: { control: 'text' }
  }
} as Meta;

const Template = (args: any) => <Checkbox {...args} />

export const Default = Template.bind({});
Default.args = {
  checked: true,
  label: 'Label text',
  onChange: $((evt) => console.log(evt.target.checked))
};
