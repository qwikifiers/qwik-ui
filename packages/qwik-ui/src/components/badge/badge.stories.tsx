import { $ } from '@builder.io/qwik';
import { Meta } from '@storybook/html';
import { Badge } from './badge';

export default {
  title: 'Data Display / Badge',
  argTypes: {
    label: { control: 'text' },
  },
} as Meta;

const Template = (args: any) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = { label: 'Label Badge' };
