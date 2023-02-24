import { component$, useSignal, useStore } from '@builder.io/qwik';
import { Pagination } from '@qwik-ui/theme-daisy';

export default component$(() => {
  const store = useStore({ page: 9 });
  const showFirstButton = useSignal(false);
  const showLastButton = useSignal(false);
  const hideNextButton = useSignal(false);
  const hidePrevButton = useSignal(false);
  const pages = useSignal(10);
  const siblingCount = useSignal(1);
  const boundaryCount = useSignal(1);

  return (
    <div class="flex flex-col gap-6 mt-4">
      <h2>This is the documentation for the Pagination</h2>

      <div
        class="flex flex-col gap-2 items-stretch"
        style={{
          width: '250px',
        }}
      >
        <label class="flex items-center justify-between gap-10">
          showFirstButton
          <input
            type="checkbox"
            checked={showFirstButton.value}
            onChange$={(e) => {
              showFirstButton.value = e.target.checked;
            }}
          />
        </label>

        <label class="flex items-center justify-between gap-10">
          showLastButton
          <input
            type="checkbox"
            checked={showLastButton.value}
            onChange$={(e) => {
              showLastButton.value = e.target.checked;
            }}
          />
        </label>

        <label class="flex items-center justify-between gap-10">
          hideNextButton
          <input
            type="checkbox"
            checked={hideNextButton.value}
            onChange$={(e) => {
              hideNextButton.value = e.target.checked;
            }}
          />
        </label>

        <label class="flex items-center justify-between gap-10">
          hidePrevButton
          <input
            type="checkbox"
            checked={hidePrevButton.value}
            onChange$={(e) => {
              hidePrevButton.value = e.target.checked;
            }}
          />
        </label>

        <label class="flex items-center justify-between gap-10">
          pages
          <input
            type="number"
            style={{
              width: '50px',
              background: 'transparent',
              textAlign: 'right',
            }}
            value={pages.value}
            onChange$={(e) => {
              pages.value = Number(e.target.value);
            }}
          />
        </label>

        <label class="flex items-center justify-between gap-10">
          siblingCount
          <input
            type="number"
            style={{
              width: '50px',
              background: 'transparent',
              textAlign: 'right',
            }}
            value={siblingCount.value}
            onChange$={(e) => {
              siblingCount.value = Number(e.target.value);
            }}
          />
        </label>

        <label class="flex items-center justify-between gap-10">
          boundaryCount
          <input
            type="number"
            style={{
              width: '50px',
              background: 'transparent',
              textAlign: 'right',
            }}
            value={boundaryCount.value}
            onChange$={(e) => {
              boundaryCount.value = Number(e.target.value);
            }}
          />
        </label>
      </div>

      <div class="flex flex-col gap-8">
        <Pagination
          pages={pages.value}
          page={store.page}
          onPaging$={(newValue: number) => {
            store.page = newValue;
          }}
          showFirstButton={showFirstButton.value}
          showLastButton={showLastButton.value}
          hideNextButton={hideNextButton.value}
          hidePrevButton={hidePrevButton.value}
          siblingCount={siblingCount.value}
          boundaryCount={boundaryCount.value}
        />
      </div>
    </div>
  );
});
