import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import { Pagination } from '@qwik-ui/headless';
import styles from '../index.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  const selectedPage = useSignal(1);
  const totalPages = useSignal(10);

  return (
    <div class="mt-4 flex flex-col gap-6">
      <Pagination
        selectedPage={selectedPage.value}
        totalPages={totalPages.value}
        onPageChange$={(page) => {
          selectedPage.value = page;
        }}
        class="border border-slate-50 p-2"
        defaultClass="border border-slate-600 p-4"
        selectedClass="border bg-slate-500 p-4"
        dividerClass="bg-slate-300 p-4"
      />

      <Pagination
        selectedPage={selectedPage.value}
        totalPages={totalPages.value}
        onPageChange$={(page) => {
          selectedPage.value = page;
        }}
        class="border border-slate-50 p-2"
        defaultClass="bg-slate-600 w-8 h-8"
        selectedClass="bg-slate-500 w-8 h-8"
        dividerClass="bg-slate-300 h-8 px-2"
      />

      <Pagination
        selectedPage={selectedPage.value}
        totalPages={totalPages.value}
        onPageChange$={(page) => {
          selectedPage.value = page;
        }}
        class="flex flex-col items-center gap-2 border border-slate-600"
        defaultClass=""
        selectedClass=""
        dividerClass=""
      />
    </div>
  );
});
