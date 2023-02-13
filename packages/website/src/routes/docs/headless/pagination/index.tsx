import { $, component$, useStore } from '@builder.io/qwik';
import { Pagination } from '@qwik-ui/headless';

export default component$(() => {
  const store = useStore({ page: 1 });
  const incrementCount = $((newValue: number) => {
    console.log(newValue);
    store.page = newValue;
  });

  return (
    <div class="flex flex-col mt-4">
      <h2>This is the documentation for the Pagination</h2>
      <div class="flex flex-col gap-8">
        <h2>Basic Example:</h2>
        <Pagination pages={15} page={store.page} onPaging$={incrementCount} />
      </div>
    </div>
  );
});
