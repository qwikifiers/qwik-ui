import { Meta } from '@storybook/html';
import { Kbd } from './kbd';

export default {
  title: 'Data Display / Kbd',
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'sm', 'xs']}
  }
} as Meta;

const Template = (args: any) => <Kbd {...args}>A</Kbd>;

export const Default = Template.bind({});
