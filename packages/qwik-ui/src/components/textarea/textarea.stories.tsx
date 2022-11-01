import { $ } from '@builder.io/qwik';
import { Meta } from '@storybook/html';
import { Textarea } from './textarea';

export default {
  title: 'Data Input / Textarea',
} as Meta;

const Template = (args: any) => <Textarea {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Textarea placeholder',
  onChange: $((evt: Event) => console.log(evt)),
};
