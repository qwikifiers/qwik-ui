import { Meta } from '@storybook/html';
import { $ } from '@builder.io/qwik';
import { Radio } from './radio';

export default {
  title: 'Data Input / Radio',
  argTypes: {
    checked: { control: 'boolean' },
    label: { control: 'text' }
  }
} as Meta;

const Template = (args: any) => <Radio {...args} />

export const Default = Template.bind({});
Default.args = {
  checked: true,
  label: 'Radio button label',
  onChange: $((evt) => console.log(evt.target.checked))
};
