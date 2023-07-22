import { $, Slot, component$ } from '@builder.io/qwik';
import { Toggle } from '@qwik-ui/primitives';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';

export const Example01 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Toggle pressed onClick$={$(() => console.log('Toggle'))} />
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
