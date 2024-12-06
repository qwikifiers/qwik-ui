import { PropsOf, component$, useSignal } from '@builder.io/qwik';
import { Button } from '~/components/ui';
import { cn } from '@qwik-ui/utils';
import copy from 'clipboard-copy';
import { LuCheck, LuCopy } from '@qwikest/icons/lucide';

export type CodeCopyProps = PropsOf<typeof Button> & {
  code?: string;
};

export const CodeCopy = component$<CodeCopyProps>(({ code = '', ...props }) => {
  const copied = useSignal(false);

  return (
    <Button
      {...props}
      look="ghost"
      title={copied.value ? 'Copied to Clipboard' : 'Copy to Clipboard'}
      class={cn(props.class)}
      onClick$={async () => {
        await copy(code);
        copied.value = true;

        setTimeout(() => {
          copied.value = false;
        }, 4000);
      }}
    >
      {copied.value ? <LuCheck class="text-white" /> : <LuCopy class="text-white" />}
    </Button>
  );
});
