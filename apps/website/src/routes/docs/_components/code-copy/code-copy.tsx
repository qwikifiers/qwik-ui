import { component$, Slot, useSignal } from '@builder.io/qwik';
import { CopyIcon } from '../../../_components/icons/CopyIcon';
import copy from 'clipboard-copy';

export const CodeCopy = component$((props: { classes?: string; code: string }) => {
  const copied = useSignal(false);
  return (
    <button
      title={copied ? 'Copied to Clipboard' : 'Copy to Clipboard'}
      class={`${props.classes} rounded p-3  hover:bg-slate-500/25 active:stroke-lime-500`}
      onClick$={async () => {
        await copy(props.code);
        copied.value = true;
      }}
    >
      <CopyIcon />
    </button>
  );
});
