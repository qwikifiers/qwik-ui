import { component$, useSignal, Slot } from '@builder.io/qwik';
import { Pagination } from '@qwik-ui/headless';
import { Toggle } from '@qwik-ui/tailwind';

export default component$(() => {
  const selectedPage = useSignal(1);
  const totalPages = useSignal(20);

  const hideNextButton = useSignal(false);
  const hidePrevButton = useSignal(false);
  const siblingCount = useSignal(1);
  const boundaryCount = useSignal(1);

  return (
    <div class="mt-4 flex flex-col gap-6">
      <Pagination
        selectedPage={selectedPage.value}
        totalPages={totalPages.value}
        siblingCount={siblingCount.value}
        boundaryCount={boundaryCount.value}
        onPageChange$={(page) => {
          selectedPage.value = page;
        }}
        defaultClass="border-2 border-sky-400 p-4"
        selectedClass="border-2 border-red-500 bg-red-500 p-4"
        dividerClass="p-4"
        hidePrevButton={hidePrevButton.value}
        hideNextButton={hideNextButton.value}
        gap={'10px'}
      >
        <span q:slot="prefix">👈</span>
        <span q:slot="suffix">👉</span>
      </Pagination>

      <div
        class="flex flex-col items-stretch gap-2"
        style={{
          width: '250px',
        }}
      >
        <label class="flex items-center justify-between gap-10">
          pages
          <input
            type="number"
            style={{
              width: '50px',
              background: 'transparent',
              textAlign: 'right',
            }}
            value={totalPages.value}
            onChange$={(e) => {
              totalPages.value = Number(e.target.value);
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
      </div>

      {/*

      <Pagination
        activeClass="bg-red-500"
        pages={20} page={10} onPaging$={() => console.log('pippo')}/>

          <h2>Interactive Demo</h2>

        <Pagination
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
        />*/}
      {/*

      <h2>Size</h2>
      <div class="flex flex-col gap-8">
        <Pagination pages={5} page={1} size="xs" />
        <Pagination pages={5} page={1} size="sm" />
        <Pagination pages={5} page={1} size="md" />
        <Pagination pages={5} page={1} size="lg" />
      </div>

      <h2>Variants</h2>
      <div class="flex flex-col gap-8">
        <Pagination pages={5} page={1} />
        <Pagination pages={5} page={1} variant="primary" />
        <Pagination pages={5} page={1} variant="secondary" />
        <Pagination pages={5} page={1} variant="accent" />
        <Pagination pages={5} page={1} variant="disabled" />
        <Pagination pages={5} page={1} variant="success" />
        <Pagination pages={5} page={1} variant="error" />
        <Pagination pages={5} page={1} variant="info" />
        <Pagination pages={5} page={1} variant="link" />
        <Pagination pages={5} page={1} variant="warning" />
      </div>

      <h2>Outline</h2>
      <div class="flex flex-col gap-8">
        <Pagination pages={5} page={1} outline />
      </div>

      <h2>Square</h2>
      <div class="flex flex-col gap-8">
        <Pagination pages={5} page={1} square />
      </div>

      <h2>Disabled</h2>
      <div class="flex flex-col gap-8">
        <Pagination pages={5} page={1} disabled={true} />
      </div>

      <h2>Custom styles and labels</h2>

      <div class="flex flex-col gap-8">
        <Pagination
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
          activeClass="!bg-cyan-800"
          defaultClass="bg-cyan-500"
          labels={{ prev: '⬅️', next: '➡️', first: 'START', last: 'END' }}
        />
      </div>
      */}
    </div>
  );
});
