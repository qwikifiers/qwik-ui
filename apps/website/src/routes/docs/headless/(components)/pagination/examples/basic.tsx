import { component$, useSignal, $ } from '@builder.io/qwik';
import { Pagination } from '@qwik-ui/headless';
import { Toggle } from '@qwik-ui/tailwind';
import { Simulate } from 'react-dom/test-utils';
import select = Simulate.select;

export default component$(() => {
  const selectedPage = useSignal(1);
  const totalPages = useSignal(10);

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
      </div>

      <Pagination
        selectedPage={selectedPage.value}
        totalPages={totalPages.value}
        onPageChange$={(page) => {
          selectedPage.value = page;
        }}
        selectedClass="bg-red-500"
        gap={'10px'}
      />
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
