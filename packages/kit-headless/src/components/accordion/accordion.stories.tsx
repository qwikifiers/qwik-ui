import { Meta, StoryObj } from 'storybook-framework-qwik';
import {
  Accordion,
  AccordionItem,
  AccordionProps,
  AccordionItemProps,
} from './accordion';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AccordionProps> = {
  component: Accordion,
};

type Story = StoryObj<{
  accordion: AccordionProps;
  accordionItem: AccordionItemProps;
}>;

export default meta;

export const Primary: Story = {
  args: {
    accordionItem: {
      label: 'Label of the accordion being tested',
    },
  },
  render: (args) => (
    <>
      <Accordion>
        <AccordionItem label={`${args.accordionItem.label}`}>
          Content of the accordion 11
        </AccordionItem>
        <AccordionItem label={`${args.accordionItem.label} 11`}>
          Content of the accordion 12
        </AccordionItem>
        <AccordionItem label={`${args.accordionItem.label} 13`}>
          Content of the accordion 13
        </AccordionItem>
        <AccordionItem label={`${args.accordionItem.label} 14`}>
          Content of the accordion 14
        </AccordionItem>
      </Accordion>
    </>
  ),
  play: ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    userEvent.click(canvas.getByText(args.accordionItem.label));
    expect(canvas.getByText('Content of the accordion 11')).toBeTruthy();
  },
};
