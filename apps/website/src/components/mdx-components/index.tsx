import { QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';
import { OmitSignalClass } from '@qwik-ui/utils';
import { StatusBanner } from '../status-banner/status-banner';
import { AnatomyTable } from '../anatomy-table/anatomy-table';
import { APITable } from '../api-table/api-table';
import { KeyboardInteractionTable } from '../keyboard-interaction-table/keyboard-interaction-table';
import { CodeCopy } from '../code-copy/code-copy';
import { statusByComponent } from '~/_state/component-statuses';

export const components: Record<string, any> = {
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
  AnatomyTable,
  APITable,
  KeyboardInteractionTable,
  StatusBanner,
  statusByComponent: statusByComponent,
};
