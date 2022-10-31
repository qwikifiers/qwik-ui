import { Meta } from '@storybook/html';
import { Link } from './link';

export default {
  title: 'Navigation / Link',
  argTypes: {
    type: { control: 'select', options: ['primary', 'secondary', 'accent', 'neutral', 'success', 'info', 'warning', 'error', 'hover']}
  }
} as Meta;

const Template = (args: any) => <Link {...args}>This is a link</Link>

export const Default = Template.bind({});
Default.args = {
  type: 'primary'
};
