import { QwikIntrinsicElements, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { OmitSignalClass } from '@qwik-ui/type-utils';
import { CodeCopy } from '../code-copy/code-copy';
import { getOrCreateHighlighter } from './get-or-create-highlighter';

export type HighlightProps = OmitSignalClass<QwikIntrinsicElements['pre']> & {
  code: string;
  splitCommentStart?: string;
  splitCommentEnd?: string;
};

export const Highlight = component$(
  ({
    code,
    splitCommentStart = '{/* start */}',
    splitCommentEnd = '{/* end */}',
    ...props
  }: HighlightProps) => {
    const codeSig = useSignal('');

    useTask$(async function createHighlightedCode() {
      const highlighter = await getOrCreateHighlighter();
      let modifiedCode: string = code;

      let partsOfCode = modifiedCode.split(splitCommentStart);
      if (partsOfCode.length > 1) {
        modifiedCode = partsOfCode[1];
      }

      partsOfCode = modifiedCode.split(splitCommentEnd);
      if (partsOfCode.length > 1) {
        modifiedCode = partsOfCode[0];
      }

      codeSig.value = highlighter.codeToHtml(modifiedCode, { lang: 'tsx' });
    });

    return (
      <div
        {...props}
        class={[
          'tab-size bg-background relative h-full max-w-full overflow-hidden overflow-x-auto rounded-xl p-12 text-sm dark:bg-slate-900',
          props.class,
        ]}
      >
        <div dangerouslySetInnerHTML={codeSig.value} />
        <CodeCopy class="absolute right-2 top-0" code={code} />
      </div>
    );
  },
);
