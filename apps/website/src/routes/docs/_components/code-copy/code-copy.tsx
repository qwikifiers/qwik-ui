import { component$, Slot, useSignal, $ } from '@builder.io/qwik';
import { CopyIcon } from '../../../_components/icons/CopyIcon';
import { ClipboardCheck } from '../../../_components/icons/ClipboardCheck';
import copy from 'clipboard-copy';
import { Toast } from '@qwik-ui/tailwind';

export const CodeCopy = component$((props: { classes?: string; code: string }) => {
  const copied = useSignal(false);
  const iconColor = useSignal('');
  const displayToast = useSignal(false);

  return (
    <>
      {displayToast.value && (
        <Toast
          label="The source code has been copied to your clipboard."
          top
          start
          variant="info"
        />
      )}
      <button
        title={copied ? 'Copied to Clipboard' : 'Copy to Clipboard'}
        class={`${props.classes} rounded p-3  hover:bg-slate-500/25 ${iconColor.value}`}
        onClick$={async () => {
          await copy(props.code);
          copied.value = true;
          iconColor.value = 'stroke-lime-500';
          displayToast.value = true;
          setTimeout(() => {
            copied.value = false;
            iconColor.value = '';
            displayToast.value = false;
          }, 3000);
        }}
      >
        {copied.value ? <ClipboardCheck /> : <CopyIcon />}
      </button>
    </>
  );
});
