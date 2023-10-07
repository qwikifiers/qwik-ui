import { Slot, component$, useSignal } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';
import { PreviewCodeExampleTabsDeprecated } from '../../../_components/preview-code-example/preview-code-example-tabs-deprecated';

export const Example01 = component$(() => {
  const showSignal = useSignal(false);

  return (
    <PreviewCodeExampleTabsDeprecated>
      <div q:slot="actualComponent">
        <Modal bind:show={showSignal}></Modal>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabsDeprecated>
  );
});
