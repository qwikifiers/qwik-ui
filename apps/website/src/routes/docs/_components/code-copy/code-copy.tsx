import { component$, useSignal, QwikIntrinsicElements } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';
import copy from 'clipboard-copy';
import { stringifyClassList } from '@qwik-ui/cva';
import { OmitSignalClass } from '@qwik-ui/type-utils';

export type CodeCopyProps = OmitSignalClass<QwikIntrinsicElements['button']> & {
  code?: string;
};

export const CodeCopy = component$(
  ({ code = '', class: outsideClass, ...restOfProps }: CodeCopyProps) => {
    const copied = useSignal(false);

    return (
      <>
        {!copied.value ? (
          <button
            {...restOfProps}
            title={copied ? 'Copied to Clipboard' : 'Copy to Clipboard'}
            class={twMerge(
              `rounded p-3 hover:bg-slate-500/25`,
              stringifyClassList(outsideClass),
            )}
            onClick$={async () => {
              await copy(code);
              copied.value = true;
            }}
          >
            Copy
          </button>
        ) : (
          <span class={twMerge(`m-3`, stringifyClassList(outsideClass))}>Copied!</span>
        )}
      </>
    );
  },
);
