import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import * as Dialog from './public_api';

const meta: Meta = {
  component: Dialog.Root,
  args: {
    dialog: {
      fullScreen: false,
    },
    dialogTrigger: {
      text: 'Open Dialog',
    },
    dialogContent: {
      title: 'Dialog Title',
      text: 'Hello World',
    },
    dialogClose: {
      text: 'Close',
    },
  },
  render: (args) => (
    <>
      <Dialog.Root fullScreen={args.dialog.fullScreen}>
        <Dialog.Trigger>
          <button>{args.dialogTrigger.text}</button>
        </Dialog.Trigger>
        <Dialog.Content>
          {args.dialogContent.text}
          <Dialog.Close>
            <button>{args.dialogClose.text}</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  ),
};

type Story = StoryObj;

export default meta;

export const Primary: Story = {
  play: ({ canvasElement, args }) => {
    /**
     *
     * TODO: This test does not provide a real value.
     *
     * It just checks for the existence in the DOM, but not if it is visible.
     * Using `toBeVisible` does not work either because the matcher does not
     * seem to be capable of detecting the visibility of a HTML-Dialog. :-(
     *
     */
    const canvas = within(canvasElement);
    userEvent.click(canvas.getByText(args.dialogTrigger.text));
    expect(canvas.getByText(args.dialogContent.text)).toBeTruthy();
    userEvent.click(canvas.getByText(args.dialogClose.text));
  },
};

export const ScrollingLongContent: Story = {
  args: {
    ...Primary.args,
    dialogContent: {
      text: Array(500)
        .fill(null)
        .map(() => 'Hello World')
        .join(' '),
    },
  },
  render: (args) => (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <button>{args.dialogTrigger.text}</button>
        </Dialog.Trigger>
        <Dialog.Content>
          {args.dialogContent.text}
          <Dialog.Actions>
            <Dialog.Close>
              <button>{args.dialogClose.text}</button>
            </Dialog.Close>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog.Root>
    </>
  ),
};

export const Aria: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <>
      <Dialog.Root
        aria-labelledby="dialog-title"
        aria-describedby="dialog-text"
      >
        <Dialog.Trigger>
          <button>{args.dialogTrigger.text}</button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.ContentTitle>
            <h2 id="dialog-title">{args.dialogContent.title}</h2>
          </Dialog.ContentTitle>
          <Dialog.ContentText>
            <p id="dialog-text">{args.dialogContent.text}</p>
          </Dialog.ContentText>
          <Dialog.Actions>
            <Dialog.Close>
              <button>{args.dialogClose.text}</button>
            </Dialog.Close>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog.Root>
    </>
  ),
};

export const FullScreen: Story = {
  args: {
    ...Primary.args,
    dialog: {
      fullScreen: true,
    },
  },
};
