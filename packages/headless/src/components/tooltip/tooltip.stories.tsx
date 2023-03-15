import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Tooltip, TooltipProps } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
};

type Story = StoryObj<typeof Tooltip>;

export default meta;

export const Primary: Story = {
  args: {
    content: 'Hi there',
  },
  render: () => (
    <Tooltip>
      <button>Hello</button>
    </Tooltip>
  ),
};
