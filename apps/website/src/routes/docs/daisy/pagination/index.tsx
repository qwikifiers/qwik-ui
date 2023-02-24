import { $, component$, useStore } from '@builder.io/qwik';
import { Pagination } from '@qwik-ui/theme-daisy';

export default component$(() => {
  const store = useStore({ page: 665 });

  return (
    <div class="flex flex-col mt-4">
      <h2>This is the documentation for the Pagination</h2>
      <div class="flex flex-col gap-8">
        <h2>Basic Example:</h2>
        <Pagination
          pages={1500}
          page={store.page}
          onPaging$={$((newValue: number) => {
            store.page = newValue;
          })}
        />
      </div>
    </div>
  );
});
