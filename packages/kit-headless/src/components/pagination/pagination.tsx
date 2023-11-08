import { usePagination } from '@/packages/kit-headless/src/components/pagination/use-pagination';
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

    visibleItems.value = usePagination(
      totalPages,
      selectedPage,
      siblingCount,
      boundaryCount,
    );

    return (
      <nav
        role="navigation"
        aria-label="pagination"
        data-testid="pagination"
        style={{ display: 'flex', alignItems: 'center', gap: gap }}
      >
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
      </nav>
    );
  },
);
