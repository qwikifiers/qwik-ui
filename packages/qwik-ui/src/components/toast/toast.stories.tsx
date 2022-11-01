import { Meta } from '@storybook/html';
import { Toast } from './toast';

export default {
  title: 'Layout / Toast',
  argTypes: {
    message: { control: 'text' },
  },
} as Meta;

const Template = (args: any) => <Toast {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: "I'm a toast",
};
