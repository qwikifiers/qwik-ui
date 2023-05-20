import { component$, Slot } from '@builder.io/qwik';
import { Button, Dialog } from '@qwik-ui/tailwind';
import { PreviewCodeExample } from '../../../../../components/preview-code-example/preview-code-example';

export const Example01 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Dialog.Root>
          <Dialog.Trigger>
            <button>Open Dialog</button>
          </Dialog.Trigger>
          <Dialog.Content>
            Hello World
            <Dialog.Close>
              <Button>Close</Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
