interface PageItem {
  type: 'page' | 'ellipsis';
  value?: number;
  key: string;
}

interface GetPageItemsArgs {
  page: number;
  totalPages: number;
  siblingCount?: number;
}

export function usePagination(
  totalPages: number,
  selectedPage: number,
  siblingCount = 1,
  // Still not supported
  boundaryCount = 1,
): (number | string)[] {
  const page = Math.min(Math.max(1, selectedPage), totalPages);

  const getPageItems = ({
    page,
    totalPages,
    siblingCount = 1,
  }: GetPageItemsArgs): PageItem[] => {
    const pageItems: PageItem[] = [];
    const pagesToShow = new Set([1, totalPages]);
    const firstItemWithSiblings = 3 + siblingCount;
    const lastItemWithSiblings = totalPages - 2 - siblingCount;

    if (firstItemWithSiblings > lastItemWithSiblings) {
      for (let p = 2; p <= totalPages - 1; p++) {
        pagesToShow.add(p);
      }
    } else if (page < firstItemWithSiblings) {
      for (let p = 2; p <= Math.min(firstItemWithSiblings, totalPages); p++) {
        pagesToShow.add(p);
      }
    } else if (page > lastItemWithSiblings) {
      for (let p = totalPages - 1; p >= Math.max(lastItemWithSiblings, 2); p--) {
        pagesToShow.add(p);
      }
    } else {
      for (
        let p = Math.max(page - siblingCount, 2);
        p <= Math.min(page + siblingCount, totalPages);
        p++
      ) {
        pagesToShow.add(p);
      }
    }

    const addPage = (value: number) => {
      pageItems.push({ type: 'page', value, key: `page-${value}` });
    };
    const addEllipsis = () => {
      pageItems.push({ type: 'ellipsis', key: `ellipsis-${pageItems.length}` });
    };

    let lastNumber = 0;
    for (const page of Array.from(pagesToShow).sort((a, b) => a - b)) {
      if (page - lastNumber > 1) {
        addEllipsis();
      }
      addPage(page);
      lastNumber = page;
    }

    return pageItems;
  };

  const pageItems = getPageItems({ page, totalPages, siblingCount });

  // Convert PageItems to the desired output format
  const paginationArray: (number | string)[] = [];
  for (const item of pageItems) {
    if (item.type === 'page') {
      paginationArray.push(item.value!); // 'value' is guaranteed to be defined for 'page' type
    } else {
      paginationArray.push('...');
    }
  }

  return paginationArray;
}

export function usePagination2(
  totalPages: number,
  selectedPage: number,
  siblingCount = 1,
  boundaryCount = 1,
) {
  const pageCount = Math.min(totalPages, Math.max(1, totalPages));
  const page = Math.min(Math.max(1, selectedPage), pageCount);

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
