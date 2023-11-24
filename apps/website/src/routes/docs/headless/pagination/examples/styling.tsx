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
        class="border-2 border-white p-2"
        defaultClass="border-2 border-sky-400 p-4"
        selectedClass="border-2 border-red-500 bg-red-500 p-4"
        dividerClass="p-4"
      />

      <Pagination
        selectedPage={selectedPage.value}
        totalPages={totalPages.value}
        onPageChange$={(page) => {
          selectedPage.value = page;
        }}
        class="border-2 border-white p-2"
        defaultClass="bg-cyan-400 w-8 h-8"
        selectedClass="bg-red-500 w-8 h-8"
        dividerClass="bg-red-300 h-8 px-2"
      />

      <Pagination
        selectedPage={selectedPage.value}
        totalPages={totalPages.value}
        onPageChange$={(page) => {
          selectedPage.value = page;
        }}
        class="flex flex-col items-center gap-2 border border-sky-500"
        defaultClass=""
        selectedClass=""
        dividerClass=""
      />
    </div>
  );
});
