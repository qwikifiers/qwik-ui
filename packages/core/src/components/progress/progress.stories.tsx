import { $ } from '@builder.io/qwik';
import { Meta } from '@storybook/html';
import { Progress } from './progress';

export default {
  title: 'Data display / Progress',
  argTypes: {
    value: { control: 'text' },
    max: { control: 'text' },
  },
} as Meta;

const Template = (args: any) => <Progress {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: '60',
  max: '100',
};
