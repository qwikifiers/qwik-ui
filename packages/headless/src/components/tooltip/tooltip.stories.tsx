import { userEvent, within } from '@storybook/testing-library';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Tooltip, TooltipProps } from './tooltip';
import { expect } from '@storybook/jest';

const meta: Meta<TooltipProps> = {
  component: Tooltip,
};

type Story = StoryObj<TooltipProps>;

export default meta;

export const Primary: Story = {
  args: {
    content: 'Hi there',
  },
  render: (args) => <Tooltip content={args.content}>Please hover me</Tooltip>,
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);

  //   await userEvent.hover(canvas.getByText('Please hover me'));

  //   await expect(canvas.getByText('Hi there')).toBeInTheDocument();
  // }
};
