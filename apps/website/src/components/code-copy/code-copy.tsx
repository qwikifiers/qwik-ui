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
        {!copied.value ? <CopyIcon /> : <ClipboardCheck />}
      </Button>
    );
  },
);

export function CopyIcon(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.25em"
      height="1.25em"
      viewBox="0 0 16 16"
      {...props}
      key={key}
    >
      <path
        fill="white"
        d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"
      ></path>
      <path
        fill="white"
        d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"
      ></path>
    </svg>
  );
}

export function ClipboardCheck(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.25em"
      height="1.25em"
      viewBox="0 0 16 16"
      {...props}
      key={key}
    >
      <path
        fill="white"
        d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042a.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
      ></path>
    </svg>
  );
}
