import { $ } from '@builder.io/qwik';
import { Meta } from '@storybook/html';
import { Avatar } from './avatar';

export default {
  title: 'Data Display / Avatar',
  argTypes: {
    src: { control: 'text' },
  },
} as Meta;

const Template = (args: any) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://placeimg.com/192/192/people',
};
