import { $ } from '@builder.io/qwik';
import { Meta } from '@storybook/html';
import { Pagination } from './pagination';

export default {
  title: 'Navigation / Pagination',
  argTypes: {
    activeOption: { control: 'number' },
    options: { control: 'object' },
  },
} as Meta;

const Template = (args: any) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  activeOption: 1,
  options: ['one', 'two', 'three'],
  onClick: $((index: number) => console.log(index)),
};
