import { component$, Slot } from '@builder.io/qwik';

export default component$((props: { title?: string; class?: string }) => {
  return (
    <div class={props.class || ''}>
      {props.title && <h1 class="mb-4 mt-8">{props.title}</h1>}
      <div class="rounded bg-slate-200 p-3 dark:bg-slate-900">
        <Slot />
      </div>
    </div>
  );
});
