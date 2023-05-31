import { component$, Slot, useSignal } from '@builder.io/qwik';
import { Button, Dialog } from '@qwik-ui/tailwind';
import { PreviewCodeExample } from '../../../../../components/preview-code-example/preview-code-example';

export const Example01 = component$(() => {
  const dialogRef = useSignal<Dialog.DialogRef>();

  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Button onClick$={() => dialogRef.value?.open()}>Open Dialog</Button>

        <Dialog.Root ref={dialogRef}>
          <Dialog.Header>
            <h2 id="dialog-heading">Hello 👋</h2>
          </Dialog.Header>
          <Dialog.Content>
            <p id="dialog-text">I am a simple Dialog.</p>
          </Dialog.Content>
          <Dialog.Footer>
            <button onClick$={() => dialogRef.value?.close()}>
              Close Dialog
            </button>
          </Dialog.Footer>
        </Dialog.Root>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
