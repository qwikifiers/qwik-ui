import { $ } from '@builder.io/qwik';
import { Meta } from '@storybook/html';
import { Menu } from './menu';

export default {
  title: 'Navigation / Menu',
  argTypes: {
    items: { control: 'object' },
  },
} as Meta;

const Template = (args: any) => <Menu {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: ['one', 'two'],
  onClick: $((index: number) => console.log(index)),
};
