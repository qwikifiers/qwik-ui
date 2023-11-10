import { component$, useSignal } from '@builder.io/qwik';
import { Pagination } from '@qwik-ui/headless';

export default component$(() => {
  const selectedPage = useSignal(5);
  const totalPages = useSignal(20);

  return (
    <div class="mt-4 flex flex-col gap-6">
      <Pagination
        selectedPage={selectedPage.value}
        totalPages={totalPages.value}
        onPageChange$={(page) => {
          selectedPage.value = page;
        }}
      >
        <span q:slot="prefix"> 👈 </span>
        <span q:slot="suffix"> 👉 </span>
      </Pagination>
    </div>
  );
});
