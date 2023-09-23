import { Slot, component$ } from '@builder.io/qwik';
import { CodeCopy } from '../code-copy/code-copy';

export const PreviewCodeExampleVertical = component$(({ ...props }) => {
  return (
    <div class="dark:border-qwikui-purple-200 shadow-light-medium dark:shadow-dark-medium flex w-full flex-col rounded-b-xl rounded-t-xl border-[1.5px] border-solid">
      <h3 class=" flex rounded-t-xl text-white"></h3>
      <section class="p-4">
        <Slot name="actualComponent" />
      </section>
      <h3 class="dark:border-qwikui-purple-200 bg-qwikui-blue-500 dark:bg-qwikui-purple-600 text-outline-lg selected border-y-[1.5px] px-4 py-2 text-white">
        Code
      </h3>
      <aside class="border-qwikui-blue-300 dark:border-qwikui-purple-200 relative rounded-b-xl border-[1.5px] border-solid bg-slate-800 p-4 dark:bg-slate-900 md:p-12">
        <CodeCopy classes="absolute top-0 right-0" code={props.code} />
        <Slot name="codeExample" />
      </aside>
    </div>
  );
});
