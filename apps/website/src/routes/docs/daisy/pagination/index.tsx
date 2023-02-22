import { component$, useStore } from '@builder.io/qwik';
import { Pagination as DaisyPagination } from '@qwik-ui/theme-daisy';

export default component$(() => {
  const store = useStore({
    pages: 10,
    page: 1,
  });

  return (
    <div class={'flex flex-col gap-4'}>
      <h2>This is the documentation for the Collapse</h2>
      <DaisyPagination
        pages={store.pages}
        page={store.page}
        onPaging$={(index) => {
          store.page = index;
        }}
      />
    </div>
  );
});
