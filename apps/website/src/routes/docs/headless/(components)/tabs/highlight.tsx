import { QwikIntrinsicElements, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { OmitSignalClass } from '@qwik-ui/type-utils';
import shiki from 'shiki';

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

    // const appState = useContext(APP_STATE_CONTEXT_ID);

    useTask$(async function createHighlightedCode() {
      const highlighter = await shiki.getHighlighter({ theme: 'css-variables' });
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
      <pre
        {...props}
        class={[
          'theme-atom-one-dark shadow-3xl tab-size relative h-full max-w-full overflow-hidden text-sm',
          props.class,
        ]}
      >
        <code dangerouslySetInnerHTML={codeSig.value} />
      </pre>
    );
  },
);
