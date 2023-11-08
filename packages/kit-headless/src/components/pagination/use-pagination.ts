// example: usePagination(20, 6, 1, 1);

export function usePagination(
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

/*
useTask$(({ track }) => {
  track(() => [selectedPage, totalPages, siblingCount, boundaryCount]);

  visibleItems.value = generatePaginationArray(
    totalPages,
    selectedPage,
    siblingCount,
    boundaryCount,
  );
});
*/
