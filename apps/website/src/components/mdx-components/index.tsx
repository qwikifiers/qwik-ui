import { Component, QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';

import { ComponentPreview } from '~/components/component-preview';
import { OmitSignalClass } from '@qwik-ui/utils';
import { CodeCopy } from '../code-copy';
import { StatusBanner } from '../status-banner';

export const components: Record<string, Component<any>> = {
  h1: component$<OmitSignalClass<QwikIntrinsicElements['pre']>>(({ ...props }) => (
    <h1 {...props} class={['"text-4xl mb-4" font-bold', props.class]}>
      <Slot />
    </h1>
  )),
  h2: component$<OmitSignalClass<QwikIntrinsicElements['h2']>>(({ ...props }) => (
    <h2 {...props} class={['mb-4 text-3xl font-bold', props.class]}>
      <Slot />
    </h2>
  )),
  h3: component$<OmitSignalClass<QwikIntrinsicElements['h3']>>(({ ...props }) => (
    <h3 {...props} class={['mb-4 text-2xl font-bold', props.class]}>
      <Slot />
    </h3>
  )),
  h4: component$<OmitSignalClass<QwikIntrinsicElements['h4']>>(({ ...props }) => (
    <h4 {...props} class={['mb-4 text-xl font-bold', props.class]}>
      <Slot />
    </h4>
  )),
  h5: component$<OmitSignalClass<QwikIntrinsicElements['h5']>>(({ ...props }) => (
    <h5 {...props} class={['mb-4 text-lg font-bold', props.class]}>
      <Slot />
    </h5>
  )),
  h6: component$<OmitSignalClass<QwikIntrinsicElements['h6']>>(({ ...props }) => (
    <h6 {...props} class={['mb-4 text-base font-bold', props.class]}>
      <Slot />
    </h6>
  )),
  a: component$<OmitSignalClass<QwikIntrinsicElements['a']>>(({ ...props }) => (
    <a {...props} class={['font-medium underline underline-offset-4', props.class]}>
      <Slot />
    </a>
  )),
  p: component$<OmitSignalClass<QwikIntrinsicElements['p']>>(({ ...props }) => (
    <p {...props} class={['mb-4 text-base font-normal', props.class]}>
      <Slot />
    </p>
  )),
  ul: component$<OmitSignalClass<QwikIntrinsicElements['ul']>>(({ ...props }) => (
    <ul {...props} class={['mb-4 text-base font-normal', props.class]}>
      <Slot />
    </ul>
  )),
  ol: component$<OmitSignalClass<QwikIntrinsicElements['ol']>>(({ ...props }) => (
    <ol {...props} class={['my-6 ml-6 list-decimal', props.class]}>
      <Slot />
    </ol>
  )),
  li: component$<OmitSignalClass<QwikIntrinsicElements['li']>>(({ ...props }) => (
    <li {...props} class={['mt-2', props.class]}>
      <Slot />
    </li>
  )),
  blockquote: component$<OmitSignalClass<QwikIntrinsicElements['blockquote']>>(
    ({ ...props }) => (
      <blockquote {...props} class={['mt-6 border-l-2 pl-6 italic', props.class]}>
        <Slot />
      </blockquote>
    ),
  ),
  img: component$<OmitSignalClass<QwikIntrinsicElements['img']>>(
    ({ children: _, alt, ...props }) => (
      <img
        {...props}
        width={props.width}
        height={props.height}
        class={['rounded-md', props.class]}
        alt={alt}
      />
    ),
  ) as Component<any>,
  hr: component$<OmitSignalClass<QwikIntrinsicElements['hr']>>(
    ({ children: _, ...props }) => <hr {...props} class="my-4 md:my-8" />,
  ) as Component<any>,
  table: component$<OmitSignalClass<QwikIntrinsicElements['table']>>(({ ...props }) => (
    <div class="my-6 w-full overflow-y-auto">
      <table {...props} class={['w-full', props.class]}>
        <Slot />
      </table>
    </div>
  )),
  tr: component$<OmitSignalClass<QwikIntrinsicElements['tr']>>(({ ...props }) => (
    <tr {...props} class={['even:bg-muted m-0 border-t p-0', props.class]} />
  )),
  th: component$<OmitSignalClass<QwikIntrinsicElements['th']>>(({ ...props }) => (
    <th
      {...props}
      class={[
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        props.class,
      ]}
    >
      <Slot />
    </th>
  )),
  td: component$<OmitSignalClass<QwikIntrinsicElements['td']>>(({ ...props }) => (
    <td
      {...props}
      class={[
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        props.class,
      ]}
    >
      <Slot />
    </td>
  )),
  pre: component$<OmitSignalClass<QwikIntrinsicElements['pre']>>(({ ...props }) => {
    return (
      <pre
        {...props}
        class={[
          'relative mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 px-2 py-4 dark:bg-zinc-900',
          props.class,
        ]}
      >
        <Slot />

        <CodeCopy class={['absolute right-4 top-4']} />
      </pre>
    );
  }),
  code: component$<OmitSignalClass<QwikIntrinsicElements['code']>>(({ ...props }) => {
    return (
      <code
        {...props}
        class={['rounded px-[0.3rem] py-[0.2rem] font-mono text-sm', props.class]}
      >
        <Slot />
      </code>
    );
  }),
  ComponentPreview,
  StatusBanner,
};
