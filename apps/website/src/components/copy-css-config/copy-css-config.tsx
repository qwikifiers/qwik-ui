import { $, component$, useSignal } from '@builder.io/qwik';
import { Modal, ModalContent, ModalHeader } from '@qwik-ui/headless';
import { Button } from '@qwik-ui/styled';
import { LuX } from '@qwikest/icons/lucide';
import { useTheme } from 'qwik-themes';
import { outputCSSConfig } from './output-css-config';

export default component$(() => {
  const showSig = useSignal(false);

  const cssThemeOutput = useSignal<string>('');

  const { theme } = useTheme();

  const generateCSSThemeOutput = $(async () => {
    const output = outputCSSConfig(theme);
    cssThemeOutput.value = output;
  });

  return (
    <>
      <Button
        onClick$={() => {
          showSig.value = true;
          generateCSSThemeOutput();
        }}
      >
        Copy code
      </Button>
      <Modal
        bind:show={showSig}
        class="my-animation bg-background text-foreground rounded-base max-w-2xl overflow-x-hidden p-8 shadow-md backdrop:backdrop-blur backdrop:backdrop-brightness-50 dark:backdrop:backdrop-brightness-100"
      >
        <ModalHeader>
          <h2 class="text-lg font-bold">Copy config</h2>
          <p>
            Copy and paste the following code into your global.css file to apply the
            styles.
          </p>
        </ModalHeader>
        <ModalContent class="mb-2 pb-4 pt-2">
          <div>
            <pre>
              <code>{cssThemeOutput.value}</code>
            </pre>
          </div>
        </ModalContent>
        <button
          onClick$={() => (showSig.value = false)}
          class="absolute right-6 top-[26px]"
        >
          <LuX class="h-8 w-8" />
        </button>
      </Modal>
    </>
  );
});
