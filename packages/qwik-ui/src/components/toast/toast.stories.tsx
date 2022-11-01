import { Meta } from '@storybook/html';
import { Toast } from './toast';

export default {
  title: 'Layout / Toast',
  argTypes: {
    message: { control: 'text' },
    type: { control: 'select', options: ['success', 'info', 'warning', 'error']},
    verticalAlign: { control: 'select', options: ['top', 'middle', 'bottom']},
    horizontalAlign: { control: 'select', options: ['start', 'center', 'end']},
  },
} as Meta;

const Template = (args: any) => <Toast {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: "I'm a toast",
};
