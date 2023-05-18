import { component$, PropFunction } from '@builder.io/qwik';
import {
  IRenderPaginationItemProps,
  Pagination as HeadlessPagination,
  IPaginationProps,
} from '@qwik-ui/headless';
import { Button } from '../button/button';

export interface PaginationProps extends Omit<IPaginationProps, 'RenderItem'> {
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
    activeClass,
    defaultClass,
    labels,
  }: IRenderPaginationItemProps) => {
    function getLabel() {
      switch (value) {
        case 'prev':
          return labels?.prev || '‹';
        case 'next':
          return labels?.next || '›';
        case 'first':
          return labels?.first || 'first';
        case 'last':
          return labels?.last || 'last';
        default:
          return value;
      }
    }

    return (
      <Button
        onClick$={onClick$}
        aria-label={ariaLabel}
        disabled={disabled}
        variant={'ghost'}
        key={key}
        active={ariaCurrent}
        circle
        class={ariaCurrent ? activeClass : defaultClass}
      >
        {getLabel()}
      </Button>
    );
  }
);

export const Pagination = component$(
  ({ page, pages, onPaging$, ...rest }: PaginationProps) => {
    return (
      <div class="flex gap-2 items-center">
        <HeadlessPagination
          {...rest}
          page={page}
          pages={pages}
          onPaging$={onPaging$}
          RenderItem={RenderPaginationItem}
          RenderDivider={component$(() => {
            return <span class="mb-2">...</span>;
          })}
        />
      </div>
    );
  }
);
