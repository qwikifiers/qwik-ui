import {
  ClassList,
  QwikIntrinsicElements,
  component$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { OmitSignalClass } from '@qwik-ui/utils';
import { CodeCopy } from '../code-copy/code-copy';

export type HighlightProps = OmitSignalClass<QwikIntrinsicElements['div']> & {
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

    useVisibleTask$(
      async function createHighlightedCode() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const highlighter = await (window as any).shikiji;
        let modifiedCode: string = code;

        let partsOfCode = modifiedCode.split(splitCommentStart);
        if (partsOfCode.length > 1) {
          modifiedCode = partsOfCode[1];
        }

        partsOfCode = modifiedCode.split(splitCommentEnd);
        if (partsOfCode.length > 1) {
          modifiedCode = partsOfCode[0];
        }

        const str = await highlighter.codeToHtml(modifiedCode, {
          lang: language,
          themes: {
            light: 'poimandres',
            dark: 'poimandres',
          },
        });
        codeSig.value = str.toString();
      },
      { strategy: 'document-idle' },
    );

    return (
      <div class="code-example relative max-h-[31.25rem] rounded-b-xl">
        <CodeCopy
          class={[
            'absolute right-4 top-4 text-white hover:bg-slate-800 hover:text-white',
            copyCodeClass,
          ]}
          code={code}
        />
        <div
          {...props}
          class={[
            'tab-size max-h-[31.25rem] max-w-full overflow-auto rounded-xl bg-gradient-to-b from-slate-900 to-slate-800 p-6 text-sm',
            props.class,
          ]}
        >
          <div dangerouslySetInnerHTML={codeSig.value} />
        </div>
      </div>
    );
  },
);
