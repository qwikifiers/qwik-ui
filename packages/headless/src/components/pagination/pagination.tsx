import { $, component$, PropFunction } from '@builder.io/qwik';
import { Button as HeadlessButton } from '@qwik-ui/headless';
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
    <div>
      <HeadlessButton
        onClick$={() => _onPaging$(props.page - 1)}
        disabled={!pagi.prev}
        class={pagi.prev ? '' : 'btn-disabled'}
        aria-label="Previous page"
      >
        prev
      </HeadlessButton>
      {pagi.before !== -1 && (
        <>
          <HeadlessButton
            onClick$={() => _onPaging$(pagi.before)}
            aria-label="Page 1"
          >
            {pagi.before}
          </HeadlessButton>
          <span>...</span>
        </>
      )}
      {pagi.items.map((item) => (
        <HeadlessButton
          onClick$={() => _onPaging$(item)}
          key={item}
          aria-label={`Page ${item}`}
          class={item === props.page ? 'btn-primary' : 'btn_gray'}
        >
          {item}
        </HeadlessButton>
      ))}
      {pagi.after !== -1 && (
        <>
          <span>...</span>
          <HeadlessButton
            aria-label={`Page ${pagi.after}`}
            onClick$={() => _onPaging$(pagi.after)}
          >
            {pagi.after}
          </HeadlessButton>
        </>
      )}
      <HeadlessButton
        aria-label={`Next page`}
        onClick$={() => _onPaging$(props.page + 1)}
        disabled={!pagi.next}
        class={pagi.next ? '' : 'btn-disabled'}
      >
        next
      </HeadlessButton>
    </div>
  );
});
