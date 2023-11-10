import { stringifyClassList } from '@qwik-ui/utils';
import { QwikIntrinsicElements, component$, useSignal } from '@builder.io/qwik';
import { Button } from '@qwik-ui/fluffy';
import { OmitSignalClass } from '@qwik-ui/utils';
import copy from 'clipboard-copy';
import { twMerge } from 'tailwind-merge';

export type CodeCopyProps = OmitSignalClass<QwikIntrinsicElements['button']> & {
  code?: string;
};

export const CodeCopy = component$(
  ({ code = '', class: outsideClass, ...restOfProps }: CodeCopyProps) => {
    const copied = useSignal(false);

    return (
      <Button
        look="ghost"
        intent="basic"
        animation={!copied.value ? 'bouncy' : 'none'}
        {...restOfProps}
        title={copied.value ? 'Copied to Clipboard' : 'Copy to Clipboard'}
        class={twMerge(stringifyClassList(outsideClass))}
        onClick$={async () => {
          await copy(code);
          copied.value = true;

          setTimeout(() => {
            copied.value = false;
          }, 4000);
        }}
      >
        {!copied.value ? 'Copy' : 'Copied!'}
      </Button>
    );
  },
);
