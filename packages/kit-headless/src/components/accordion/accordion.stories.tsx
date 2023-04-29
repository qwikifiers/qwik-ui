import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Accordion, AccordionItem, AccordionProps } from './accordion';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AccordionProps> = {
  component: Accordion,
};

export default meta;

type Story = StoryObj<AccordionProps>;

export const Primary: Story = {
  render: () => (
    <Accordion>
      <AccordionItem label="Item 1">This is a test</AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Item 1'));

    await expect(canvas.getByText('This is a test')).toBeInTheDocument();
  },
};
