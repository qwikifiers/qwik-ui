import { ClassList, PropsOf, component$, useSignal, useTask$, $ } from '@builder.io/qwik';
import { CodeCopy } from '../code-copy/code-copy';
import { cn } from '@qwik-ui/utils';
import { BundledLanguage, codeToHtml } from 'shiki/index.mjs';

export type HighlightProps = PropsOf<'div'> & {
  code: string;
  copyCodeClass?: ClassList;
  language?: BundledLanguage;
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

    const addShiki$ = $(async () => {
      let modifiedCode = code.toString();

      let partsOfCode = modifiedCode.split(splitCommentStart);

      if (partsOfCode.length > 1) {
        modifiedCode = partsOfCode[1];
      }

      partsOfCode = modifiedCode.split(splitCommentEnd);

      if (partsOfCode.length > 1) {
        modifiedCode = partsOfCode[0];
      }

      const str = await codeToHtml(modifiedCode, {
        lang: language,
        theme: 'material-theme-palenight',
      });

      codeSig.value = str.toString();
    });

    useTask$(async () => {
      await addShiki$();
    });

    return (
      <div class="code-example relative max-h-[31.25rem] rounded-base">
        <CodeCopy
          class={[
            'absolute right-3 top-3 text-white hover:bg-slate-800 hover:text-white',
            copyCodeClass,
          ]}
          code={code}
        />
        <div
          {...props}
          class={cn(
            'tab-size max-h-[31.25rem] max-w-full overflow-auto rounded-sm bg-gradient-to-b from-slate-900 to-slate-800 p-6 text-sm dark:from-background dark:to-accent/30',
            props.class,
          )}
        >
          <div dangerouslySetInnerHTML={codeSig.value} />
        </div>
      </div>
    );
  },
);
