import { QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';
import { OmitSignalClass } from '@qwik-ui/utils';
import { StatusBanner } from '../status-banner/status-banner';
import { AnatomyTable } from '../anatomy-table/anatomy-table';
import { APITable } from '../api-table/api-table';
import { KeyboardInteractionTable } from '../keyboard-interaction-table/keyboard-interaction-table';
import { CodeCopy } from '../code-copy/code-copy';
import { Showcase } from '../showcase/showcase';
import { CodeSnippet } from '../code-snippet/code-snippet';
import { InstallSnippet } from '../install-snippet/install-snippet';

export const components: Record<string, any> = {
  pre: component$<
    OmitSignalClass<
      QwikIntrinsicElements['pre'] & {
        __rawString__?: string;
      }
    >
  >(({ __rawString__, ...props }) => {
    return (
      <div class="code-example relative mx-6 max-h-[31.25rem] rounded-xl bg-[#1D232A] lg:mx-8">
        <CodeCopy
          class={[
            'absolute right-4 top-4 border-2 text-slate-50 hover:bg-slate-800 hover:text-slate-50',
          ]}
          code={__rawString__}
        />
        <div
          {...props}
          style={''} // required to override shiki's
          class={[
            'tab-size max-h-[31.25rem] max-w-full overflow-auto rounded-xl border bg-gradient-to-b from-slate-900 to-slate-800  p-6 text-sm',
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
  code: component$<QwikIntrinsicElements['code']>(() => {
    return (
      <code>
        <Slot />
      </code>
    );
  }),
  AnatomyTable,
  APITable,
  KeyboardInteractionTable,
  StatusBanner,
  Showcase,
  CodeSnippet,
  InstallSnippet,
};
