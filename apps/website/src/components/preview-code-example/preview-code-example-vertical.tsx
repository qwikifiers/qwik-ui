import { Slot, component$ } from '@builder.io/qwik';
import { Highlight } from '../highlight';
import { PreviewCodeExampleProps } from './preview-code-example-props.type';

export const PreviewCodeExampleVertical = component$((props: PreviewCodeExampleProps) => {
  return (
    <div class="dark:border-qwikui-purple-200 shadow-light-medium dark:shadow-dark-medium flex w-full flex-col rounded-xl border-[1.5px] border-solid border-slate-200">
      <h3 class=" flex rounded-t-xl text-white"></h3>
      <section class="rounded-t-xl bg-slate-50 p-4 dark:bg-slate-800">
        <Slot name="actualComponent" />
      </section>
      <h3 class="dark:border-qwikui-purple-200 bg-qwikui-blue-600 dark:bg-qwikui-purple-800 text-outline-lg selected border-y-[1.5px] px-4 py-2 font-bold text-white">
        Code
      </h3>
      <aside class="rounded-b-xl border-[1.5px] border-solid">
        <Highlight code={props.code} class="rounded rounded-t-none" />
      </aside>
    </div>
  );
});
