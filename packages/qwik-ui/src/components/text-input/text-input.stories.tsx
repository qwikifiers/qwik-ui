import { $ } from '@builder.io/qwik';
import { Meta } from '@storybook/html';
import { TextInput } from './text-input';

export default {
  title: 'Data Input / TextInput',
} as Meta;

const Template = (args: any) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'TextInput placeholder',
  onChange: $((evt: Event) => console.log(evt)),
};
