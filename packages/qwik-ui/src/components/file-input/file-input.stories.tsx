import { $ } from '@builder.io/qwik';
import { Meta } from '@storybook/html';
import { FileInput } from './file-input';

export default {
  title: 'Data Input / FileInput',
} as Meta;

const Template = (args: any) => <FileInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  onChange: $((evt: Event) => console.log(evt)),
};
