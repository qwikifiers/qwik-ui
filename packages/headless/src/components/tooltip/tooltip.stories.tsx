import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Tooltip, TooltipProps } from './tooltip';

const meta: Meta<TooltipProps> = {
  component: Tooltip,
};

type Story = StoryObj<TooltipProps>;

export default meta;

export const Primary: Story = {
  args: {
    content: 'Hi there',
  },
  render: () => (
    <Tooltip content="test">
      <button>Hello</button>
    </Tooltip>
  ),
};
