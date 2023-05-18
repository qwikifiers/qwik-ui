import { component$, Slot } from '@builder.io/qwik';
import { Badge } from '@qwik-ui/headless';
import { Button } from '@qwik-ui/primitives';
import { PreviewCodeExample } from '../../../../../components/preview-code-example/preview-code-example';

export const Example01 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Badge class="px-4 py-1 bg-primary rounded-full">Badge</Badge>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const Example02 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Button class="flex justify-between items-center px-4 py-2 gap-2 bg-primary rounded-md">
          Inbox
          <Badge class="flex justify-center px-1 bg-secondary rounded-full text-xs">
            +4
          </Badge>
        </Button>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
