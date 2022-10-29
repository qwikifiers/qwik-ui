import { Meta } from '@storybook/html';
import { Divider } from './divider';

export default {
  title: 'Layout / Divider',
  argTypes: {
    label: { control: 'text' },
    horizontal: { control: 'boolean' }
  }
} as Meta;

const Template = (args: any) => <div className={`flex w-full ${!args.horizontal && 'flex-col'}`}>
  <div>item 1</div>
  <Divider {...args} />
  <div>item 2</div>
</div>;

export const Default = Template.bind({});
Default.args = {
  label: 'Or'
}
