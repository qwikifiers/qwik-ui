import { PaginationProps } from './types';
import { usePagination } from './use-pagination';
import { component$, Slot } from '@builder.io/qwik';

export const Pagination = component$<PaginationProps>((props) => {
  const {
    selectedPage,
    totalPages,
    onPageChange$,
    siblingCount,
    boundaryCount,
    hidePrevButton = false,
    hideNextButton = false,
    disabled = false,
    customArrowTexts: {
      previous: previousButtonLabel = 'PREV',
      next: nextButtonLabel = 'NEXT',
    } = {},
    class: _class,
    defaultClass,
    selectedClass,
    dividerClass,
  } = props;

  const isPrevButtonVisible = () => !hidePrevButton && selectedPage > 1;
  const isNextButtonVisible = () => !hideNextButton && selectedPage !== totalPages;

  const visibleItems = usePagination(
    totalPages,
    selectedPage,
    siblingCount || 1,
    boundaryCount || 1,
  );

  return (
    <nav
      aria-label="pagination"
      data-testid="pagination"
      class={_class}
      style={{
        pointerEvents: disabled ? 'none' : 'inherit',
      }}
    >
      {/* Prev Button */}
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
          <span>{previousButtonLabel}</span>
        </button>
      )}

      {/* Button List */}
      {visibleItems.map((item: string | number, index: number) => {
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

      {/* Next Button */}
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
          <span>{nextButtonLabel}</span>
          <Slot name="suffix" />
        </button>
      )}
    </nav>
  );
});
