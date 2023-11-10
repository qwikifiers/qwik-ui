import { component$, useStore } from '@builder.io/qwik';
import { Pagination as HeadlessPagination } from '@qwik-ui/headless';

export default component$(() => {
  const store = useStore({
    pages: 10,
    page: 1,
  });

  return (
    <>
      <h2>This is the documentation for the Pagination</h2>
      <HeadlessPagination
        pages={store.pages}
        page={store.page}
        onPaging$={(index) => {
          store.page = index;
        }}
      />
    </>
  );
});
