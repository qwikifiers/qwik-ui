import { Meta } from '@storybook/html';
import { Badge } from './badge';

export default {
  title: 'Data Display / Badge',
  argTypes: {
    color: { control: 'select', options: ['success', 'info', 'warning', 'error', 'primary', 'secondary', 'accent'] },
    withOutline: { control: 'boolean' }
  },
} as Meta;

const Template = (args: any) => <Badge {...args}>{args.content}</Badge>;

export const Default = Template.bind({});
Default.args = {
  content: 'Badge label'
}
