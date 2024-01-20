import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { AnatomyTable } from '../anatomy-table/anatomy-table';
import { APITable } from '../api-table/api-table';
import { CodeCopy } from '../code-copy/code-copy';
import { CodeSnippet } from '../code-snippet/code-snippet';
import { InstallSnippet } from '../install-snippet/install-snippet';
import { KeyboardInteractionTable } from '../keyboard-interaction-table/keyboard-interaction-table';
import { Note } from '../note/note';
import { Showcase } from '../showcase/showcase';
import { StatusBanner } from '../status-banner/status-banner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const components: Record<string, any> = {
  p: component$<PropsOf<'p'>>(({ ...props }) => {
    return (
      <p {...props} class={[cn('mb-6 last:mb-0', props.class)]}>
        <Slot />
      </p>
    );
  }),
  h1: component$<PropsOf<'h1'>>(({ ...props }) => {
    return (
      <h1
        {...props}
        class={[cn('mb-6 pt-6 text-3xl font-extrabold md:text-5xl', props.class)]}
      >
        <Slot />
      </h1>
    );
  }),
  h2: component$<PropsOf<'h2'>>(({ ...props }) => {
    return (
      <h2
        {...props}
        class={[
          cn(
            'mb-8 mt-20 scroll-mt-32 border-b-[1px] pb-2 text-2xl font-extrabold',
            props.class,
          ),
        ]}
      >
        <Slot />
      </h2>
    );
  }),
  h3: component$<PropsOf<'h3'>>(({ ...props }) => {
    return (
      <h3 {...props} class={[cn('mb-6 mt-8 text-xl font-semibold', props.class)]}>
        <Slot />
      </h3>
    );
  }),
  h4: component$<PropsOf<'h4'>>(({ ...props }) => {
    return (
      <h4 {...props} class={[cn('mb-4 mt-6 text-lg font-medium', props.class)]}>
        <Slot />
      </h4>
    );
  }),
  h5: component$<PropsOf<'h5'>>(({ ...props }) => {
    return (
      <h5 {...props} class={[cn('text-base font-[700]', props.class)]}>
        <Slot />
      </h5>
    );
  }),
  blockquote: component$(() => {
    return (
      <Note>
        <Slot />
      </Note>
    );
  }),
  ul: component$<PropsOf<'ul'>>(({ ...props }) => {
    return (
      <ul {...props} class={[cn('mb-4 list-disc px-6 font-medium', props.class)]}>
        <Slot />
      </ul>
    );
  }),
  li: component$<PropsOf<'li'>>(({ ...props }) => {
    return (
      <li {...props} class={[cn('py-2', props.class)]}>
        <Slot />
      </li>
    );
  }),
  pre: component$<
    PropsOf<'div'> & {
      __rawString__?: string;
    }
  >(({ __rawString__, ...props }) => {
    return (
      <div
        {...props}
        class={[cn('relative  mb-6 max-h-[31.25rem] rounded-sm', props.class)]}
      >
        <CodeCopy class="absolute right-4 top-4" code={__rawString__} />
        <div class="max-h-[31.25rem] max-w-full overflow-auto rounded-sm border bg-gradient-to-b from-slate-900 to-slate-800 p-6 text-sm">
          <pre>
            <Slot />
          </pre>
        </div>
      </div>
    );
  }),
  code: component$<PropsOf<'code'>>(() => {
    return (
      <code class="whitespace-pre-wrap">
        <Slot />
      </code>
    );
  }),
  AnatomyTable,
  APITable,
  CodeSnippet,
  InstallSnippet,
  KeyboardInteractionTable,
  Note,
  StatusBanner,
  Showcase,
};
