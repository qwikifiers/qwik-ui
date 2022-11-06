import { $ } from '@builder.io/qwik';
import { Meta } from '@storybook/html';
import { Navbar } from './navbar';

export default {
  title: 'Navigation / Navbar',
  argTypes: {
    links: { control: 'object' },
  },
} as Meta;

const Template = (args: any) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: ['one', 'two'],
  onClick: $((index: number) => console.log(index)),
};
