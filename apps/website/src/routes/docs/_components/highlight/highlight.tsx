import {
  ClassList,
  QwikIntrinsicElements,
  component$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { OmitSignalClass } from '@qwik-ui/utils';
import { CodeCopy } from '../code-copy/code-copy';
import { getOrCreateHighlighter } from './get-or-create-highlighter';

export type HighlightProps = OmitSignalClass<QwikIntrinsicElements['pre']> & {
  code: string;
  copyCodeClass?: ClassList;
  language?: 'tsx' | 'html' | 'css';
  splitCommentStart?: string;
  splitCommentEnd?: string;
};

export const Highlight = component$(
  ({
    code,
    copyCodeClass,
    language = 'tsx',
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

      console.log(highlighter);
      codeSig.value = highlighter.codeToHtml(modifiedCode, { lang: language });
    });

    return (
      <div
        {...props}
        class={[
          'tab-size relative max-w-full overflow-hidden overflow-x-auto rounded-b-xl bg-slate-50 p-12 text-sm dark:bg-slate-800',
          props.class,
        ]}
      >
        <div dangerouslySetInnerHTML={codeSig.value} />
        <CodeCopy
          class={[
            'absolute right-2 top-2 bg-slate-200 text-slate-950 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600',
            copyCodeClass,
          ]}
          code={code}
        />
      </div>
    );
  },
);
