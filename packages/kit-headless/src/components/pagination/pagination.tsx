import { usePagination } from '@/packages/kit-headless/src/components/pagination/use-pagination';
import type { PropFunction } from '@builder.io/qwik';
import { component$, Slot, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';

/**
 * TODO
 * disabled: enable/disable paginator
 */

type ArrowLabels = {
  previous: string;
  next: string;
};

export interface PaginationProps {
  selectedPage: number;
  totalPages: number;
  onPageChange$: PropFunction<(page: number) => void>;

  // configuration
  siblingCount?: number;
  boundaryCount?: number;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  disabled?: boolean;
  customArrowTexts?: ArrowLabels;

  // styling
  class?: string;
  gap?: string;
  defaultClass?: string;
  selectedClass?: string;
  dividerClass?: string;
}

export const Pagination = component$<PaginationProps>((props) => {
  const {
    selectedPage,
    totalPages,
    onPageChange$,
    // configuration
    hidePrevButton = false,
    hideNextButton = false,
    disabled = false,
    customArrowTexts: {
      previous: previousButtonLabel = 'PREV',
      next: nextButtonLabel = 'NEXT',
    } = {},
    // styling
    class: _class,
    gap = '10px',
    defaultClass,
    selectedClass,
    dividerClass,
  } = props;

  const visibleItems = useSignal<(string | number)[]>([]);
  const isPrevButtonVisible = () => !hidePrevButton && selectedPage > 1;
  const isNextButtonVisible = () => !hideNextButton && selectedPage !== totalPages;

  useTask$(({ track }) => {
    track(() => [
      props.selectedPage,
      props.totalPages,
      props.siblingCount,
      props.boundaryCount,
    ]);

    visibleItems.value = usePagination(
      props.totalPages,
      props.selectedPage,
      props.siblingCount || 1,
      props.boundaryCount || 1,
    );
  });

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-testid="pagination"
      class={_class}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap,
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
