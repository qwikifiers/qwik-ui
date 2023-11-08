import { usePagination } from '@/packages/kit-headless/src/components/pagination/use-pagination';
import type { PropFunction } from '@builder.io/qwik';
import { component$, Slot, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';

/**
 * TODO
 * show / hide PREV / NEXT buttons
 * customArrowTexts: { previous: '...', next: '... }
 * disabled: enable/disable paginator
 *
 */

export interface PaginationProps {
  selectedPage: number;
  totalPages: number;
  onPageChange$: PropFunction<(page: number) => void>;

  // configuration
  siblingCount?: number;
  boundaryCount?: number;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;

  // styles
  class?: string;
  gap?: number | string;
  defaultClass?: string;
  selectedClass?: string;
  dividerClass?: string;
}

export const Pagination = component$<PaginationProps>(
  ({
    selectedPage,
    totalPages,
    onPageChange$,

    siblingCount = 1,
    boundaryCount = 1,
    hidePrevButton = false,
    hideNextButton = false,

    class: _class,
    gap = '10px',
    defaultClass,
    selectedClass,
    dividerClass,
  }) => {
    const visibleItems = useSignal<(string | number)[]>([]);

    visibleItems.value = usePagination(
      totalPages,
      selectedPage,
      siblingCount,
      boundaryCount,
    );

    const isPrevButtonVisible = () => !hidePrevButton && selectedPage > 1;
    const isNextButtonVisible = () => !hideNextButton && selectedPage !== totalPages;

    return (
      <nav
        role="navigation"
        aria-label="pagination"
        data-testid="pagination"
        style={{ display: 'flex', alignItems: 'center', gap: gap }}
      >
        {/* PREV BUTTON */}
        {isPrevButtonVisible() && (
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
        )}
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
        {isNextButtonVisible() && (
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
        )}
      </nav>
    );
  },
);
