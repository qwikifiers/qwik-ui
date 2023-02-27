import { $, component$, PropFunction, Component } from '@builder.io/qwik';
import { Button as HeadlessButton } from '../button/button';

export interface IPaginationProps extends IGetPaginationItemsOptions {
  pages: number;
  page: number;
  onPaging$: PropFunction<(index: number) => void>;
  RenderItem?: Component<IRenderPaginationItemProps>;
  RenderDivider?: Component<object>;
}

export interface IRenderPaginationItemProps {
  onClick$: PropFunction<() => void>;
  disabled?: boolean;
  'aria-label': string;
  'aria-current'?: boolean;
  value: TPaginationItemValue;
  key?: string | number;
}

export type TPaginationItemValue =
  | 'prev'
  | 'next'
  | number
  | 'start-ellipsis'
  | 'end-ellipsis'
  | 'first'
  | 'last'
  | string;

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export type TPaginationItem =
  | 'first'
  | 'last'
  | 'prev'
  | 'next'
  | 'divider'
  | number
  | string;

export interface IGetPaginationItems {
  page: number;
  count: number;
  options: IGetPaginationItemsOptions;
}

export interface IGetPaginationItemsOptions {
  boundaryCount?: number;
  siblingCount?: number;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  showFirstButton?: boolean;
  showLastButton?: boolean;
}

export const getPaginationItems = (
  page: IGetPaginationItems['page'],
  count: IGetPaginationItems['count'],
  {
    boundaryCount = 1,
    siblingCount = 1,
    hidePrevButton,
    hideNextButton,
    showFirstButton,
    showLastButton,
  }: IGetPaginationItems['options']
): TPaginationItem[] => {
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

export const RenderPaginationItem = component$(
  ({
    'aria-label': ariaLabel,
    disabled,
    onClick$,
    key,
    value,
  }: IRenderPaginationItemProps) => {
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
    RenderItem = RenderPaginationItem,
    RenderDivider = PaginationDivider,
    onPaging$,
    page,
    pages,
    ...rest
  }: IPaginationProps) => {
    const pagi = getPaginationItems(page, pages, rest);

    const _onPaging$ = $((page: number) => {
      if (page < 1 || page > pages) return;
      onPaging$(page);
    });

    return (
      <>
        {pagi.map((item, i) => {
          return (
            <>
              {item === 'divider' ? (
                <RenderDivider key={i} />
              ) : (
                <RenderItem
                  key={i}
                  onClick$={() =>
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
                  }
                  disabled={
                    (['prev', 'first'].includes(item.toString()) &&
                      page === 1) ||
                    (['next', 'last'].includes(item.toString()) &&
                      page === pages)
                  }
                  aria-label={`Page ${item}`}
                  aria-current={item === page}
                  value={item}
                />
              )}
            </>
          );
        })}
      </>
    );
  }
);
