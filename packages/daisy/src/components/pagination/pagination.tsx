import { component$, PropFunction } from '@builder.io/qwik';
import { Pagination as HeadlessPagination } from '@qwik-ui/headless';

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
  return (
    <div class="flex gap-2">
      <HeadlessPagination
        page={props.page}
        pages={props.pages}
        onPaging$={props.onPaging$}
      ></HeadlessPagination>
    </div>
  );
});
