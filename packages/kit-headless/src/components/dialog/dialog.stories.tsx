import { component$, useSignal } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import * as Dialog from './public_api';

/**
 * Using a component$ here to be able to use `useSignal`.
 * useSignal cannot be used directly inside a story's render-Function.
 */
const DialogStoryComponent = component$((props: Dialog.RootProps) => {
  const dialogRef = useSignal<Dialog.DialogRef>();

  return (
    <>
      <button onClick$={() => dialogRef.value?.open$()}>Open Dialog</button>

      <Dialog.Element {...props} ref={dialogRef}>
        <Dialog.Header>
          <h2 id="dialog-heading">Hello 👋</h2>
        </Dialog.Header>
        <Dialog.Content>
          <p id="dialog-text">I am a simple Dialog.</p>
          <p>
            {Array(500)
              .fill(null)
              .map(() => 'Hello World')
              .join(' ')}
          </p>
        </Dialog.Content>
        <Dialog.Footer>
          <button onClick$={() => dialogRef.value?.close$()}>
            Close Dialog
          </button>
        </Dialog.Footer>
      </Dialog.Element>
      <div style="background-color: red; width: 50vw; height: 150vh"></div>
    </>
  );
});

const meta: Meta<Dialog.RootProps> = {
  component: Dialog.Element,
  args: {
    fullScreen: false,
    'aria-describedby': 'dialog-text',
    'aria-labelledby': 'dialog-heading',
  },
  render: (props) => <DialogStoryComponent {...props} />,
};

type Story = StoryObj<Dialog.RootProps>;

export default meta;

export const Primary: Story = {};

export const FullScreen: Story = {
  args: {
    fullScreen: true,
  },
};
