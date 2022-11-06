import { $ } from '@builder.io/qwik';
import { Meta } from '@storybook/html';
import { InputGroup } from './input-group';

export default {
  title: 'Layout / InputGroup',
} as Meta;

const Template = (args: any) => <InputGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  hint: 'Your email',
  label: 'email',
  placeholder: 'info@site.com',
  onChange: $((evt: Event) => console.log(evt)),
};
