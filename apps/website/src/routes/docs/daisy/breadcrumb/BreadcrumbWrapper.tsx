import { component$, Slot } from '@builder.io/qwik';

export default component$((props: { title?: string; class?: string }) => {
  return (
    <div class={props.class || ''}>
      {props.title && <h1 class="mt-8 mb-4">{props.title}</h1>}
      <div class="dark:bg-slate-900 bg-slate-200 rounded p-3">
        <Slot />
      </div>
    </div>
  );
});
