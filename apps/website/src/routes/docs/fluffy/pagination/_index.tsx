import { component$, useSignal } from '@builder.io/qwik';
import { Toggle } from '@qwik-ui/tailwind';

export default component$(() => {
  const page = useSignal(5);
  const pages = useSignal(10);

  const showFirstButton = useSignal(true);
  const showLastButton = useSignal(true);
  const hideNextButton = useSignal(true);
  const hidePrevButton = useSignal(true);
  const siblingCount = useSignal(1);
  const boundaryCount = useSignal(1);

  return (
    <div class="mt-4 flex flex-col gap-6">
      <h2>This is the documentation for the Pagination</h2>

      <div
        class="flex flex-col items-stretch gap-2"
        style={{
          width: '250px',
        }}
      >
        <Toggle
          pressed={showFirstButton.value}
          onClick$={() => {
            showFirstButton.value = !showFirstButton.value;
          }}
          label="showFirstButton"
        />

        <Toggle
          pressed={showLastButton.value}
          onClick$={() => {
            showLastButton.value = !showLastButton.value;
          }}
          label="showLastButton"
        />

        <Toggle
          pressed={hideNextButton.value}
          onClick$={() => {
            hideNextButton.value = !hideNextButton.value;
          }}
          label="hideNextButton"
        />

        <Toggle
          pressed={hidePrevButton.value}
          onClick$={() => {
            hidePrevButton.value = !hidePrevButton.value;
          }}
          label="hidePrevButton"
        />

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
        Pagination Example
        {/* <Pagination
          pages={pages.value}
          page={page.value}
          onPaging$={(newValue: number) => {
            page.value = newValue;
          }}
          showFirstButton={showFirstButton.value}
          showLastButton={showLastButton.value}
          hideNextButton={hideNextButton.value}
          hidePrevButton={hidePrevButton.value}
          siblingCount={siblingCount.value}
          boundaryCount={boundaryCount.value}
        /> */}
      </div>

      <div class="flex flex-col gap-8">
        Pagination Example
        {/* <Pagination
          pages={pages.value}
          page={page.value}
          onPaging$={(newValue: number) => {
            page.value = newValue;
          }}
          showFirstButton={showFirstButton.value}
          showLastButton={showLastButton.value}
          hideNextButton={hideNextButton.value}
          hidePrevButton={hidePrevButton.value}
          siblingCount={siblingCount.value}
          boundaryCount={boundaryCount.value}
          activeClass="!bg-cyan-500"
          defaultClass="bg-cyan-200"
          labels={{ prev: '⬅️', next: '➡️', first: 'START', last: 'END' }}
        /> */}
      </div>
    </div>
  );
});
