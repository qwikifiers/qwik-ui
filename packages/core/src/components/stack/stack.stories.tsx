import { Meta } from '@storybook/html';
import { Stack } from './stack';

export default {
  title: 'Layout / Stack'
} as Meta;

const Template = (args: any) => <Stack {...args}>
  <div className="grid w-32 h-20 rounded bg-primary text-primary-content place-content-center">1</div>
  <div className="grid w-32 h-20 rounded bg-accent text-accent-content place-content-center">2</div>
  <div className="grid w-32 h-20 rounded bg-secondary text-secondary-content place-content-center">3</div>
</Stack>

export const Default = Template.bind({});
