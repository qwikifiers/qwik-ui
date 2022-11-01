import { Meta } from '@storybook/html';
import { Rating } from './rating';

export default {
  title: 'Data input / Rating',
  argTypes: {
    value: { control: 'number' },
    max: { control: 'number' },
  },
} as Meta;

const Template = (args: any) => <Rating {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 2,
  max: 6,
};
