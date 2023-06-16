import { $, type PropFunction, type QRL } from '@builder.io/qwik';

export interface UsePaginationOptions {
  boundaryCount?: number;
  currentPage?: number;
  onChange$?: PropFunction<
    (currentPageNumber: number, oldPageNumber: number) => void
  >;
  siblingCount?: number;
  totalPages: number;
}

export interface UsePaginationResult {
  displayedPages: (number | symbol)[];
  // getCanGotoPreviousPage: () => boolean;
  // getCanGotoNextPage: () => boolean;
  gotoFirstPage$: QRL<() => void>;
  gotoLastPage$: QRL<() => void>;
  gotoNextPage$: QRL<() => void>;
  gotoPageNumber$: QRL<(pageNumber: number) => void>;
  gotoPreviousPage$: QRL<() => void>;
}

type ResolvedUsePaginationOptions = Required<
  Omit<UsePaginationOptions, 'onChange$'>
> &
  Pick<UsePaginationOptions, 'onChange$'>;

export const DEFAULT_BOUNDARY_COUNT = 1;
export const DEFAULT_CURRENT_PAGE = 1;
export const DEFAULT_SIBLING_COUNT = 1;
export const DIVIDER = Symbol('divider');
export const MINIMUM_BOUNDARY_COUNT = 0;
export const MINIMUM_CURRENT_PAGE = 1;
export const MINIMUM_SIBLING_COUNT = 0;
export const MINIMUM_TOTAL_PAGES = 1;

export function usePagination(
  options: UsePaginationOptions
): UsePaginationResult {
  const resolvedOptions = resolveOptions(options);

  const actions = usePaginationActions(resolvedOptions);

  const lowerBoundaryPageNumbers = getLowerBoundaryPageNumbers(resolvedOptions);
  const upperBoundaryPageNumbers = getUpperBoundaryPageNumbers(resolvedOptions);
  const lowestSiblingPageNumber = getLowestSiblingPageNumber(resolvedOptions);
  const highestSiblingPageNumber = getHighestSiblingPageNumber({
    ...resolvedOptions,
    lowestUpperBoundaryPageNumber: upperBoundaryPageNumbers[0],
  });

  const middlePageNumbers = range(
    lowestSiblingPageNumber,
    highestSiblingPageNumber
  );

  const displayedPages = [
    // ...(showFirstButton ? ['first'] : []),
    // ...(hidePrevButton ? [] : ['prev']),

    ...lowerBoundaryPageNumbers,

    ...(lowestSiblingPageNumber > resolvedOptions.boundaryCount + 2
      ? [DIVIDER]
      : resolvedOptions.boundaryCount + 1 <
        resolvedOptions.totalPages - resolvedOptions.boundaryCount
      ? [resolvedOptions.boundaryCount + 1]
      : []),

    ...(middlePageNumbers.length > 0
      ? middlePageNumbers
      : [resolvedOptions.currentPage]),

    ...(highestSiblingPageNumber <
    resolvedOptions.totalPages - resolvedOptions.boundaryCount - 1
      ? [DIVIDER]
      : resolvedOptions.totalPages - resolvedOptions.boundaryCount >
        resolvedOptions.boundaryCount
      ? [resolvedOptions.totalPages - resolvedOptions.boundaryCount]
      : []),

    ...upperBoundaryPageNumbers,

    // ...(hideNextButton ? [] : ['next']),
    // ...(showLastButton ? ['last'] : []),
  ];

  return { ...actions, displayedPages };
}

function usePaginationActions(options: ResolvedUsePaginationOptions) {
  const { currentPage, onChange$, totalPages } = options;

  const gotoFirstPage$ = $(() => {
    if (currentPage === MINIMUM_CURRENT_PAGE) return;

    onChange$?.(MINIMUM_CURRENT_PAGE, currentPage);
  });

  const gotoLastPage$ = $(() => {
    if (currentPage === totalPages) return;

    onChange$?.(totalPages, currentPage);
  });

  const gotoNextPage$ = $(() => {
    if (currentPage === totalPages) return;

    onChange$?.(currentPage + 1, currentPage);
  });

  const gotoPageNumber$ = $((pageNumber: number) => {
    if (
      pageNumber === currentPage ||
      pageNumber < MINIMUM_CURRENT_PAGE ||
      pageNumber > totalPages
    )
      return;

    onChange$?.(pageNumber, currentPage);
  });

  const gotoPreviousPage$ = $(() => {
    if (currentPage === MINIMUM_CURRENT_PAGE) return;

    onChange$?.(currentPage - 1, currentPage);
  });

  return {
    gotoFirstPage$,
    gotoLastPage$,
    gotoNextPage$,
    gotoPageNumber$,
    gotoPreviousPage$,
  };
}

function resolveOptions(
  options: UsePaginationOptions
): ResolvedUsePaginationOptions {
  const totalPages = Math.max(
    MINIMUM_TOTAL_PAGES,
    Math.floor(options.totalPages)
  );

  return {
    ...options,
    boundaryCount: Math.max(
      MINIMUM_BOUNDARY_COUNT,
      options.boundaryCount ?? DEFAULT_BOUNDARY_COUNT
    ),
    currentPage: Math.min(
      totalPages,
      Math.max(
        MINIMUM_CURRENT_PAGE,
        options.currentPage ?? DEFAULT_CURRENT_PAGE
      )
    ),
    siblingCount: Math.max(
      MINIMUM_SIBLING_COUNT,
      options.siblingCount ?? DEFAULT_SIBLING_COUNT
    ),
    totalPages,
  };
}

function getLowerBoundaryPageNumbers({
  boundaryCount,
  totalPages,
}: ResolvedUsePaginationOptions): number[] {
  return range(1, Math.min(boundaryCount, totalPages));
}

function getUpperBoundaryPageNumbers({
  boundaryCount,
  totalPages,
}: ResolvedUsePaginationOptions): number[] {
  return range(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages
  );
}

function getLowestSiblingPageNumber({
  boundaryCount,
  currentPage,
  totalPages,
  siblingCount,
}: ResolvedUsePaginationOptions): number {
  const naturalStart = currentPage - siblingCount; // FIXME: better name for this.

  return Math.max(
    Math.min(
      naturalStart,
      totalPages - boundaryCount - siblingCount * 2 - 1 // FIXME: make the code explain itself better. Lower boundary when page is high
    ),
    boundaryCount + 2 // FIXME: make the code explain itself better. Greater than startPages
  );
}

function getHighestSiblingPageNumber({
  boundaryCount,
  currentPage,
  totalPages,
  siblingCount,
  lowestUpperBoundaryPageNumber,
}: ResolvedUsePaginationOptions & {
  lowestUpperBoundaryPageNumber: number | undefined;
}): number {
  const naturalEnd = currentPage + siblingCount; // FIXME: better name for this.

  return Math.min(
    Math.max(
      naturalEnd,
      boundaryCount + siblingCount * 2 + 2 // FIXME: make the code explain itself better. Upper boundary when page is low
    ),
    lowestUpperBoundaryPageNumber !== undefined
      ? lowestUpperBoundaryPageNumber - 2
      : totalPages - 1 // FIXME: make the code explain itself better. Less than endPages
  );
}

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};
