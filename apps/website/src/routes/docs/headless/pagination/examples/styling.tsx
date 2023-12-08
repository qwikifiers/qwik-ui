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
        class="border-foreground border p-2"
        defaultClass="border border-primary p-4"
        selectedClass="border bg-destructive p-4"
        dividerClass="bg-muted p-4"
      />

      <Pagination
        selectedPage={selectedPage.value}
        totalPages={totalPages.value}
        onPageChange$={(page) => {
          selectedPage.value = page;
        }}
        class="border-foreground border p-2"
        defaultClass="bg-primary w-8 h-8"
        selectedClass="bg-destructive w-8 h-8"
        dividerClass="bg-muted h-8 px-2"
      />

      <Pagination
        selectedPage={selectedPage.value}
        totalPages={totalPages.value}
        onPageChange$={(page) => {
          selectedPage.value = page;
        }}
        class="border-primary flex flex-col items-center gap-2 border"
        defaultClass=""
        selectedClass=""
        dividerClass=""
      />
    </div>
  );
});
