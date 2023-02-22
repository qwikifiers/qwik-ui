import { component$, $, PropFunction, Slot } from '@builder.io/qwik';
import {
  IRenderPaginationItemProps,
  Pagination as HeadlessPagination,
} from '@qwik-ui/headless';
import { Button } from '@qwik-ui/theme-daisy';

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

export const RenderPaginationItem = component$(
  ({
    'aria-label': ariaLabel,
    disabled,
    'aria-current': ariaCurrent,
    onClick$,
    key,
    value,
  }: IRenderPaginationItemProps) => {
    return (
      <Button
        onClick$={onClick$}
        aria-label={ariaLabel}
        disabled={disabled}
        variant={'ghost'}
        key={key}
        active={ariaCurrent}
        circle
      >
        {value === 'prev' ? '‹' : value === 'next' ? '›' : value}
      </Button>
    );
  }
);

export const Pagination = component$((props: PaginationProps) => {
  return (
    <div class="flex gap-2 items-center">
      <HeadlessPagination
        page={props.page}
        pages={props.pages}
        onPaging$={props.onPaging$}
        RenderItem={RenderPaginationItem}
        RenderDivider={component$(() => {
          return <span class="mb-2">...</span>;
        })}
      />
    </div>
  );
});
