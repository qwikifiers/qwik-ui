export function getPaginationItems(pages: number, page: number) {
  // *show which arrows to light up
  const canGo = {
    prev: page > 1,
    next: page < pages,
  };

  // one of first 5 pages -> should show 1, 2, 3, 4, 5 ... [last]
  // or if length is less than 5, all pages
  if (pages < 4 || page < 5) {
    return {
      items: Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1),
      after: pages > 5 ? pages : -1,
      before: -1,
      ...canGo,
    };
  }

  // one of last 4 pages -> should show [first] ... [6, 7, 8, 9, 10]
  if (Math.abs(page - pages) < 4) {
    return {
      items: Array.from({ length: 5 }, (_, i) => pages - 4 + i),
      before: 1,
      after: -1,
      ...canGo,
    };
  }

  // it's somewhere in the middle
  // -> [first] ... [4, 5, 6] ... [last]
  return {
    items: Array.from({ length: 3 }, (_, i) => page - 1 + i),
    before: 1,
    after: pages,
    ...canGo,
  };
}
