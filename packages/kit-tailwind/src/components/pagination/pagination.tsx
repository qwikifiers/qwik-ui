import { component$ } from '@builder.io/qwik';
import {
  Pagination as HeadlessPagination,
  PaginationProps,
  PaginationButtonProps,
  PaginationOptions,
  PaginationSharedProps,
} from '@qwik-ui/headless';
import { Button } from '../button/button';

/**
 * Pagination
 * ----------
 * A pagination component
 * first page is 1
 *
 * @example
 * <Pagination pages={15} page={store.page} onPaging$={incrementCount} />
 */

export const TailwindPaginationButton = component$(
  ({
    'aria-label': ariaLabel,
    'aria-current': ariaCurrent,
    disabled,
    onClick$,
    key,
    value,
    activeClass,
    defaultClass,
    labels,
    size,
  }: PaginationButtonProps & PaginationSharedProps) => {
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
        size={size}
      >
        {getLabel()}
      </Button>
    );
  }
);

export const Pagination = component$(
  ({
    page,
    pages,
    onPaging$,
    ...rest
  }: Omit<PaginationProps, 'RenderItem'> & PaginationProps) => {
    return (
      <div class="flex gap-2 items-center">
        <HeadlessPagination
          {...rest}
          page={page}
          pages={pages}
          onPaging$={onPaging$}
          RenderItem={TailwindPaginationButton}
          RenderDivider={component$(() => {
            return <span class="mb-2">...</span>;
          })}
        />
      </div>
    );
  }
);
