import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Popover, PopoverProps } from './popover';

const meta: Meta<PopoverProps> = {
  component: Popover,
}

type Story = StoryObj<PopoverProps>;

export default meta;

export const Primary: Story = {
  args: {
    content: 'Oh hi mark!',
  },
  render: (args) => <Popover content={args.content}>Please hover me</Popover>,
}
