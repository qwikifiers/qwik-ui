import { $, component$, PropFunction } from '@builder.io/qwik';
import { Button } from '@qwik-ui/material';
import { getPaginationItems } from '@qwik-ui/shared';

export interface PaginationProps {
  pages: number;
  page: number;
  onPaging$: PropFunction<(index: number) => void>;
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
