import { $ } from '@builder.io/qwik';
import { Meta } from '@storybook/html';
import { Toggle } from './toggle';

export default {
  title: 'Actions / Toggle',
  argTypes: {
    checked: { control: 'boolean' },
    label: { control: 'text' }
  }
} as Meta;

const Template = (args: any) => (
  <Toggle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  checked: true,
  label: 'Label toggle',
  onChange: $((evt: Event) => {})
};
