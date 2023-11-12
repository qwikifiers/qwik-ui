import { component$, useSignal, Slot, useStylesScoped$ } from '@builder.io/qwik';
import { Pagination } from '@qwik-ui/headless';
import { Toggle } from '@qwik-ui/tailwind';
import styles from '../index.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  const selectedPage = useSignal(1);
  const totalPages = useSignal(20);

  const hideNextButton = useSignal(false);
  const hidePrevButton = useSignal(false);
  const siblingCount = useSignal(1);

  return (
    <div class="mt-4 flex flex-col gap-6">
      <Pagination
        selectedPage={selectedPage.value}
        totalPages={totalPages.value}
        siblingCount={siblingCount.value}
        onPageChange$={(page) => {
          selectedPage.value = page;
        }}
        hidePrevButton={hidePrevButton.value}
        hideNextButton={hideNextButton.value}
        class="pagination-wrapper"
        selectedClass="pagination-selected-btn"
        defaultClass="pagination-btn"
        dividerClass="pagination-divider"
        prevButtonClass="prevNextButtons"
        nextButtonClass="prevNextButtons"
      />

      <hr />

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
    </div>
  );
});
