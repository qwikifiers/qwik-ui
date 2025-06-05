import { type ClassList, type PropsOf, component$ } from '@builder.io/qwik';
import { CodeCopy } from '../code-copy/code-copy';
import { cn } from '@qwik-ui/utils';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { createHighlighter } from 'shiki/bundle/web';

const jsEngine = createJavaScriptRegexEngine();

const shiki = await createHighlighter({
  themes: ['poimandres'],
  langs: ['tsx', 'html', 'css'],
  engine: jsEngine,
});

export type HighlightProps = PropsOf<'div'> & {
  code: string;
  copyCodeClass?: ClassList;
  language?: 'tsx' | 'html' | 'css';
};

export const Highlight = component$(
  ({ code, copyCodeClass, language = 'tsx', ...props }: HighlightProps) => {
    return (
      <div class="code-example data-pagefind-ignore relative rounded-base">
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
            'tab-size max-h-[494px] max-w-full overflow-auto rounded-sm bg-gradient-to-b from-slate-900 to-slate-800 p-6 text-sm dark:from-background dark:to-accent/30',
            props.class,
          )}
          data-pagefind-ignore="all"
        >
          <div
            dangerouslySetInnerHTML={shiki.codeToHtml(code, {
              lang: language,
              theme: 'poimandres',
            })}
          />
        </div>
      </div>
    );
  },
);
