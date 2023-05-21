import { component$, useSignal } from '@builder.io/qwik';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import * as Dialog from './public_api';
import { DialogRef } from './types/dialog-ref';

const meta: Meta<Dialog.RootProps> = {
  component: Dialog.Root,
  args: {
    fullScreen: false,
  },
  render: (props) => (
    <Dialog.Root {...props}>
      <Dialog.Trigger>
        <button>Open Dialog</button>
      </Dialog.Trigger>
      <Dialog.Content>
        Hello World
        <Dialog.Close>
          <button>Close</button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  ),
};

type Story = StoryObj<Dialog.RootProps>;

export default meta;

export const Primary: Story = {
  play: ({ canvasElement }) => {
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
    userEvent.click(canvas.getByText('Open Dialog'));
    expect(canvas.getByText('Hello World')).toBeTruthy();
    userEvent.click(canvas.getByText('Close'));
  },
};

export const ScrollingLongContent: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>
        <button>Open Dialog</button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.ContentTitle>
          <h2>My Dialog Title</h2>
        </Dialog.ContentTitle>
        {Array(500)
          .fill(null)
          .map(() => 'Hello World')
          .join(' ')}
        <Dialog.Actions>
          <Dialog.Close>
            <button>Close</button>
          </Dialog.Close>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog.Root>
  ),
};

export const Aria: Story = {
  args: {
    ...Primary.args,
    'aria-labelledby': 'dialog-title',
    'aria-describedby': 'dialog-text',
  },
  render: (props) => (
    <Dialog.Root {...props}>
      <Dialog.Trigger>
        <button>Open Dialog</button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.ContentTitle>
          <h2 id={props['aria-labelledby']}>My Dialog Title</h2>
        </Dialog.ContentTitle>
        <Dialog.ContentText>
          <p id={props['aria-describedby']}>Hello World</p>
        </Dialog.ContentText>
        <Dialog.Actions>
          <Dialog.Close>
            <button>Close</button>
          </Dialog.Close>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog.Root>
  ),
};

export const FullScreen: Story = {
  args: {
    fullScreen: true,
  },
};

/**
 * Using a component$ here to be able to use `useSignal`.
 * useSignal cannot be used directly inside a story's render-Function.
 */
const DialogUsingRef = component$(() => {
  const dialogRef = useSignal<DialogRef>();

  return (
    <>
      <button onClick$={() => dialogRef.value?.open$()}>
        I am opening the dialog by using its <code>ref</code>
      </button>

      <Dialog.Root ref={dialogRef}>
        <Dialog.Content>
          <p>Hello World</p>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
});

export const Ref: Story = {
  render: () => <DialogUsingRef />,
};
