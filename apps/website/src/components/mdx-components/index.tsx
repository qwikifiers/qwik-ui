import { Component, QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';

import { OmitSignalClass } from '@qwik-ui/utils';
import { StatusBanner } from '../status-banner';
import { CodeCopy } from '../code-copy';
import { Example } from '../example';
import { AnatomyTable } from '../anatomy-table';
import { KeyboardInteractionTable } from '../keyboard-interaction-table';
import { APITable } from '../api-table';
import { CodeSnippet } from '../code-snippet';
import { InstallExample } from '~/routes/docs/fluffy/(getting-started)/install/examples';

export const components: Record<string, Component<any>> = {
  pre: component$<
    OmitSignalClass<
      QwikIntrinsicElements['pre'] & {
        __rawString__?: string;
      }
    >
  >(({ __rawString__, ...props }) => {
    return (
      <div class="code-example relative max-h-[31.25rem] rounded-b-xl">
        <CodeCopy
          class={[
            'copy-btn-bg-dark absolute right-4 top-4 bg-slate-200 text-white hover:bg-slate-600 hover:text-white',
          ]}
          code={__rawString__}
        />
        <div
          {...props}
          class={[
            'tab-size code-example-gradient max-h-[31.25rem] max-w-full overflow-auto rounded-xl bg-slate-800 p-6 text-sm dark:bg-slate-800',
            props.class,
          ]}
        >
          <pre>
            <Slot />
          </pre>
        </div>
      </div>
    );
  }),
  AnatomyTable: AnatomyTable as Component<any>,
  APITable: APITable as Component<any>,
  CodeSnippet: CodeSnippet as Component<any>,
  Example,
  InstallExample,
  KeyboardInteractionTable: KeyboardInteractionTable as Component<any>,
  StatusBanner,
};
