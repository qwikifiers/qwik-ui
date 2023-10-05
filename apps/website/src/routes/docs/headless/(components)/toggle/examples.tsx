import { Slot, component$ } from '@builder.io/qwik';
import { Toggle } from '@qwik-ui/primitives';
import { PreviewCodeExampleTabsDeprecated } from '../../../_components/preview-code-example/preview-code-example-tabs';

export const Example01 = component$(() => {
  return (
    <PreviewCodeExampleTabsDeprecated>
      <div q:slot="actualComponent">
        <Toggle pressed={true} onClick$={() => console.log('Toggle')} />
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabsDeprecated>
  );
});
