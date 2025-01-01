import { type Component, type PropsOf, Slot, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { AnatomyTable } from '../anatomy-table/anatomy-table';
import { APITable } from '../api-table/api-table';
import { AutoAPI } from '../api-table/auto-api';
import { CodeCopy } from '../code-copy/code-copy';
import { CodeSnippet } from '../code-snippet/code-snippet';
import { FeatureList } from '../feature-list/feature-list';
import { InstallSnippet } from '../install-snippet/install-snippet';
import { KeyboardInteractionTable } from '../keyboard-interaction-table/keyboard-interaction-table';
import { Note } from '../note/note';
import { Showcase } from '../showcase/showcase';
import { StatusBanner } from '../status-banner/status-banner';
import { TopLayerAnimationsCaveats } from '../animations/caveats';
import { BrowserAnimationsCompatability } from '../animations/compatability';

export const components: Record<string, Component> = {
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
        class={[
          cn('mb-6 scroll-mt-24 pt-6 text-3xl font-extrabold md:text-5xl', props.class),
        ]}
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
            'mb-8 mt-20 scroll-mt-24 border-b-2 pb-2 text-2xl font-extrabold',
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
      <h3
        {...props}
        class={[cn('mb-6 mt-8 scroll-mt-20 text-xl font-semibold', props.class)]}
      >
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
      <h5 {...props} class={[cn('text-base font-normal', props.class)]}>
        <Slot />
      </h5>
    );
  }),
  a: component$<PropsOf<'a'>>(({ ...props }) => {
    return (
      <a
        {...props}
        class={[
          cn('font-semibold underline underline-offset-4 hover:opacity-90', props.class),
        ]}
        target="_blank"
        rel="noreferrer"
      >
        <Slot />
      </a>
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
  pre: component$<{
    __rawString__?: string;
  }>(({ __rawString__ }) => {
    return (
      <div
        class="code-example data-pagefind-ignore relative mb-6 max-h-[31.25rem] rounded-base"
        data-pagefind-ignore="all"
      >
        <CodeCopy class="absolute right-3 top-3" code={__rawString__} />
        <div
          class={cn(
            'max-h-[31.25rem] max-w-full overflow-y-auto rounded-base border bg-gradient-to-b from-slate-900 to-slate-800 p-6 text-sm dark:from-background dark:to-accent/30',
          )}
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
  CodeSnippet,
  FeatureList,
  InstallSnippet,
  KeyboardInteractionTable,
  Note,
  StatusBanner,
  Showcase,
  AutoAPI,
  TopLayerAnimationsCaveats,
  BrowserAnimationsCompatability,
};
