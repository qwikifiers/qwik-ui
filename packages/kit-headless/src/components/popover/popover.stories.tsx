import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Popover, PopoverProps } from './popover';
import { PopoverContent } from './popover-content';
import { PopoverTrigger } from './popover-trigger';

const meta: Meta<PopoverProps> = {
  component: Popover,
};

type Story = StoryObj<PopoverProps>;

export default meta;

export const Primary: Story = {
  render: () => (
    <Popover>
      <PopoverContent>Oh hi mark!</PopoverContent>
      <PopoverTrigger>Click me please</PopoverTrigger>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = await canvas.findByRole('button');

    await userEvent.click(button);

    const popover = await canvas.findByRole('dialog');

    await expect(popover).toHaveTextContent('Oh hi mark!');
  },
};
