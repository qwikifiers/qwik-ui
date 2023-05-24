import { $, component$, PropFunction, Component } from '@builder.io/qwik';
import { Button as HeadlessButton } from '@qwik-ui/primitives';
import { TailwindButtonSizes, TailwindButtonVariants } from '@qwik-ui/tailwind';

/**
 * PROPS
 * pageIndex: default pagination value
 * activeStyles: The styles of the active page button
 * normalStyles: The styles of the inactive page buttons
 * customArrowTexts: { previous, next }
 * disabled: enable/disable paginator
 * size: 'sm' | 'md' | 'lg'
 *
 * TODO
 * color: primary | secondary
 * variant: outlined (show border without bg)
 * shape: rounded | square
 * paginationRange (see https://mui.com/material-ui/react-pagination/#pagination-ranges)
 *
 * PAGINATION TODOs
 * V Get storybook testing to work
 * - Add stories
 */

/**
 * Properties of the Pagination Component
 */
export interface PaginationProps extends PaginationOptions {
  pages: number;
  page: number;
  onPaging$?: PropFunction<(index: number) => void>;
  RenderItem?: Component<PaginationButtonProps & PaginationSharedProps>;
  RenderDivider?: Component<object>;
}

/**
 * Properties to configure the Pagination options
 */
export interface PaginationOptions extends PaginationSharedProps {
  boundaryCount?: number;
  siblingCount?: number;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  labels?: PaginationButtonLabels;
  disabled?: boolean;
}

/**
 * Properties used by both, the Pagination component & RenderItem (the Button)
 */
export interface PaginationSharedProps {
  activeClass?: string;
  defaultClass?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: TailwindButtonVariants;
}

/**
 * Properties of the RenderItem (the Button)
 */
export interface PaginationButtonProps {
  onClick$: PropFunction<() => void>;
  disabled?: boolean;
  'aria-label': string;
  'aria-current'?: boolean;
  key?: string | number;
  value: PaginationButtonValue;
  labels?: PaginationButtonLabels;
}

export type PaginationButtonValue =
  | 'prev'
  | 'next'
  | 'first'
  | 'last'
  // | 'divider'
  // | 'start-ellipsis'
  // | 'end-ellipsis'
  | number
  | string;

export interface PaginationButtonLabels {
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export const getPaginationButtons = (
  page: number,
  count: number,
  labels: PaginationButtonLabels | undefined,
  {
    boundaryCount = 1,
    siblingCount = 1,
    hidePrevButton,
    hideNextButton,
    showFirstButton,
    showLastButton,
  }: PaginationOptions
): PaginationButtonValue[] => {
  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingsStart = Math.max(
    Math.min(
      page - siblingCount, // Natural start
      count - boundaryCount - siblingCount * 2 - 1 // Lower boundary when page is high
    ),
    boundaryCount + 2 // Greater than startPages
  );

  const siblingsEnd = Math.min(
    Math.max(
      page + siblingCount, // Natural end
      boundaryCount + siblingCount * 2 + 2 // Upper boundary when page is low
    ),
    endPages.length > 0 ? endPages[0] - 2 : count - 1 // Less than endPages
  );

  const items = [
    ...(showFirstButton ? ['first'] : []),
    ...(hidePrevButton ? [] : ['prev']),
    ...startPages,

    ...(siblingsStart > boundaryCount + 2
      ? ['divider']
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),

    ...range(siblingsStart, siblingsEnd),

    ...(siblingsEnd < count - boundaryCount - 1
      ? ['divider']
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

    ...endPages,
    ...(hideNextButton ? [] : ['next']),
    ...(showLastButton ? ['last'] : []),
  ];

  return items;
};

export const PaginationButton = component$(
  ({
    'aria-label': ariaLabel,
    disabled,
    onClick$,
    key,
    value,
  }: PaginationButtonProps) => {
    return (
      <HeadlessButton
        onClick$={onClick$}
        aria-label={ariaLabel}
        disabled={disabled}
        key={key}
      >
        {value}
      </HeadlessButton>
    );
  }
);

export const PaginationDivider = component$(() => {
  return <span>...</span>;
});

/**
 * Pagination
 * ----------
 * A pagination component
 * first page is 1
 *
 * @example
 * <Pagination pages={15} page={store.page} onPaging$={incrementCount} />
 */
export const Pagination = component$(
  ({
    RenderItem = PaginationButton,
    RenderDivider = PaginationDivider,
    onPaging$,
    page,
    pages,
    activeClass,
    defaultClass,
    labels,
    disabled,
    size,
    variant,
    ...rest
  }: PaginationProps) => {
    const _onPaging$ = $((page: number) => {
      if (page < 1 || page > pages) return;
      if (onPaging$) onPaging$(page);
    });

    const itemClickHandler = $((item: PaginationButtonValue) =>
      _onPaging$(
        (() => {
          switch (item) {
            case 'first':
              return 1;
            case 'prev':
              return page - 1;
            case 'next':
              return page + 1;
            case 'last':
              return pages;
            default:
              if (typeof item === 'number') return item;
              return page;
          }
        })()
      )
    );

    const items = getPaginationButtons(page, pages, labels, rest);

    return (
      <>
        {items.map((item, i) => {
          return (
            <>
              {item === 'divider' ? (
                <RenderDivider key={i} />
              ) : (
                <RenderItem
                  activeClass={activeClass}
                  defaultClass={defaultClass}
                  key={i}
                  labels={labels}
                  onClick$={() => itemClickHandler(item)}
                  disabled={
                    disabled ||
                    (['prev', 'first'].includes(item.toString()) &&
                      page === 1) ||
                    (['next', 'last'].includes(item.toString()) &&
                      page === pages)
                  }
                  aria-label={`Page ${item}`}
                  aria-current={item === page}
                  value={item}
                  size={size}
                  variant={variant}
                />
              )}
            </>
          );
        })}
      </>
    );
  }
);
