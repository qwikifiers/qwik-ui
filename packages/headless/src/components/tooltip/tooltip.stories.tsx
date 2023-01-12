import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Tooltip, TooltipProps } from './tooltip';

export default {
  component: Tooltip,
} as Meta<TooltipProps>;

export const Primary: StoryObj<TooltipProps> = {
  args: {
    content: 'Hi there',
  },
  render: () => (
    <Tooltip>
      <button>Hello</button>
    </Tooltip>
  ),
};
