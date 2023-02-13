import { $, component$, PropFunction } from '@builder.io/qwik';
import { Button } from '@qwik-ui/material';

export interface PaginationProps {
  pages: number;
  page: number;
  onPaging$: PropFunction<(index: number) => void>;
}

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

/**
 * Pagination
 * ----------
 * A pagination component
 * first page is 1
 *
 * @example
 * <Pagination pages={15} page={store.page} onPaging$={incrementCount} />
 */
export const Pagination = component$((props: PaginationProps) => {
  const pagi = getPaginationItems(props.pages, props.page);

  const _onPaging$ = $((page: number) => {
    if (page < 1 || page > props.pages) return;
    props.onPaging$(page);
  });

  return (
    <div class="flex gap-2">
      <Button
        onClick$={() => _onPaging$(props.page - 1)}
        disabled={!pagi.prev}
        class={pagi.prev ? '' : 'btn-disabled'}
        aria-label="Previous page"
      >
        prev
      </Button>
      {pagi.before !== -1 && (
        <>
          <Button onClick$={() => _onPaging$(pagi.before)} aria-label="Page 1">
            {pagi.before}
          </Button>
          <span>...</span>
        </>
      )}
      {pagi.items.map((item) => (
        <Button
          onClick$={() => _onPaging$(item)}
          key={item}
          aria-label={`Page ${item}`}
          class={item === props.page ? 'btn-primary' : 'btn_gray'}
        >
          {item}
        </Button>
      ))}
      {pagi.after !== -1 && (
        <>
          <span>...</span>
          <Button
            aria-label={`Page ${pagi.after}`}
            onClick$={() => _onPaging$(pagi.after)}
          >
            {pagi.after}
          </Button>
        </>
      )}
      <Button
        aria-label={`Next page`}
        onClick$={() => _onPaging$(props.page + 1)}
        disabled={!pagi.next}
        class={pagi.next ? '' : 'btn-disabled'}
      >
        next
      </Button>
    </div>
  );
});
