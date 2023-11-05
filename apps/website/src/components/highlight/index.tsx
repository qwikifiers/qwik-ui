import {
  ClassList,
  QwikIntrinsicElements,
  component$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { OmitSignalClass } from '@qwik-ui/utils';
import { CodeCopy } from '../code-copy';
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
      <div class="code-example relative max-h-[31.25rem] rounded-b-xl">
        <CodeCopy
          class={[
            'copy-btn-bg-dark absolute right-4 top-4 bg-slate-200 text-white hover:bg-slate-600 hover:text-white',
            copyCodeClass,
          ]}
          code={code}
        />
        <div
          {...props}
          class={[
            'tab-size code-example-gradient max-h-[31.25rem] max-w-full overflow-auto rounded-xl bg-slate-800 p-6 text-sm dark:bg-slate-800',
            props.class,
          ]}
        >
          <div dangerouslySetInnerHTML={codeSig.value} />
        </div>
      </div>
    );
  },
);
