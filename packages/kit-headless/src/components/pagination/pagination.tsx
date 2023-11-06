import type { PropFunction } from '@builder.io/qwik';
import { component$, Slot, useSignal, useTask$ } from '@builder.io/qwik';

/**
 * TODO
 * show / hide PREV / NEXT buttons
 * customArrowTexts: { previous: '...', next: '... }
 * disabled: enable/disable paginator
 *
 * FLUFFY THEME
 * size: 'sm' | 'md' | 'lg'
 * variant: 'primary' | 'secondary' | ...
 * outline
 * square
 */

// example generatePaginationArray(20, 6, 1, 1);
function generatePaginationArray(
  count: number,
  defaultPage: number,
  siblingCount = 1,
  boundaryCount = 1,
) {
  const pageCount = Math.min(count, Math.max(1, count));
  const page = Math.min(Math.max(1, defaultPage), pageCount);

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const leftBoundary = range(1, Math.min(boundaryCount, pageCount));
  const rightBoundary = range(pageCount - boundaryCount + 1, pageCount);
  const innerRange = range(
    Math.max(page - siblingCount, boundaryCount + 1),
    Math.min(page + siblingCount, pageCount - boundaryCount),
  );

  const buttons = [...leftBoundary, ...innerRange, ...rightBoundary];

  // Add "..." for gaps between buttons
  const paginationArray = buttons.reduce(
    (result: (number | string)[], button: number, index, array) => {
      if (index === 0) {
        result.push(button);
      } else {
        const prevButton = array[index - 1];
        if (button - prevButton === 2) {
          result.push(prevButton + 1);
        } else if (button - prevButton > 2) {
          result.push('...');
        }
        result.push(button);
      }
      return result;
    },
    [],
  );

  return paginationArray;
}

export interface PaginationProps {
  class?: string;
  selectedPage: number;
  totalPages: number;
  onPageChange$: PropFunction<(page: number) => void>;

  // configuration
  siblingCount?: number;
  boundaryCount?: number;
  // styles
  gap?: number | string;
  defaultClass?: string;
  selectedClass?: string;
  dividerClass?: string;
}

export const Pagination = component$<PaginationProps>(
  ({
    class: _class,
    selectedPage,
    totalPages,
    onPageChange$,
    gap = '10px',
    defaultClass,
    selectedClass,
    dividerClass,
    siblingCount = 1,
    boundaryCount = 1,
  }) => {
    const visibleItems = useSignal<(string | number)[]>([]);

    useTask$(({ track }) => {
      track(() => [selectedPage, totalPages, siblingCount, boundaryCount]);
      visibleItems.value = generatePaginationArray(
        totalPages,
        selectedPage,
        siblingCount,
        boundaryCount,
      );
    });

    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: gap }}>
          {/* PREV BUTTON */}
          <button
            type="button"
            aria-label={'prevAriaLabel'}
            disabled={selectedPage <= 1}
            onClick$={() => {
              if (selectedPage > 1) {
                onPageChange$(selectedPage - 1);
              }
            }}
          >
            <Slot name="prefix" />
            <span>PREV</span>
          </button>

          {visibleItems.value.map((item: string | number, index: number) => {
            return (
              <span key={index}>
                {typeof item === 'string' ? (
                  <button class={dividerClass}>...</button>
                ) : (
                  <button
                    class={[selectedPage === item ? selectedClass : defaultClass]}
                    type="button"
                    aria-label={`Page ${item} of ${totalPages}`}
                    aria-current={selectedPage === item}
                    onClick$={() => {
                      onPageChange$(item);
                    }}
                  >
                    {item}
                  </button>
                )}
              </span>
            );
          })}

          {/* NEXT BUTTON */}
          <button
            type="button"
            aria-label={'nextAriaLabel'}
            disabled={selectedPage >= totalPages}
            onClick$={() => {
              if (selectedPage < totalPages) {
                onPageChange$(selectedPage + 1);
              }
            }}
          >
            <span>NEXT</span>
            <Slot name="suffix" />
          </button>
        </div>

        {/*
          PREVIOUS IMPLEMENTATION
          It display all items
        */}
        {/*
        <nav role="navigation" aria-label="pagination" data-testid="pagination">
          <button
            type="button"
            aria-label={'prevAriaLabel'}
            disabled={selectedPage <= 1}
            onClick$={() => {
              if (selectedPage !== 1) {
                onPageChange$(selectedPage - 1);
              }
            }}
          >
            <Slot name="prefix" />
            <span>PREV</span>
          </button>

          <ul style={{ display: 'flex', gap: gap }}>
            {[...new Array(totalPages + 1).keys()].map((page: number) => {
              if (page === 0) return null;
              return (
                <li key={page}>
                  <div>
                    <button
                      class={{
                        defaultClass,
                        [selectedClass || '']: selectedPage === page,
                      }}
                      type="button"
                      aria-label={`Page ${page} of ${totalPages}`}
                      aria-current={selectedPage === page}
                      onClick$={() => {
                        onPageChange$(page);
                      }}
                    >
                      {page}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            aria-label={'nextAriaLabel'}
            disabled={selectedPage >= totalPages}
            onClick$={() => {
              if (selectedPage < totalPages) {
                onPageChange$(selectedPage + 1);
              }
            }}
          >
            <span>NEXT</span>
            <Slot name="suffix" />
          </button>
        </nav>
        */}
      </>
    );
  },
);
