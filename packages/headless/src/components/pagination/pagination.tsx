import {
  $,
  component$,
  PropFunction,
  JSXNode,
  QRL,
  FunctionComponent,
  JSXChildren,
  Component,
  QwikIntrinsicElements,
  Slot,
  Fragment,
} from '@builder.io/qwik';
import { JSX } from '@builder.io/qwik/jsx-runtime';
import { Button as HeadlessButton } from '@qwik-ui/headless';

export interface IPaginationProps {
  pages: number;
  page: number;
  onPaging$: PropFunction<(index: number) => void>;
  RenderItem?: Component<IRenderPaginationItemProps>;
  RenderDivider?: Component<object>;
}

export interface IRenderPaginationItemProps {
  onClick$: PropFunction<() => void>;
  disabled?: boolean;
  'aria-label': string;
  'aria-current'?: boolean;
  value: PaginationItemValue;
  key?: string | number;
}

export type PaginationItemValue = 'prev' | 'next' | number;

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

export const RenderPaginationItem = component$(
  ({
    'aria-label': ariaLabel,
    disabled,
    onClick$,
    key,
    value,
  }: IRenderPaginationItemProps) => {
    return (
      <HeadlessButton
        onClick$={onClick$}
        aria-label={ariaLabel}
        disabled={disabled}
        key={key}
      >
        {value}
      </HeadlessButton>
    );
  }
);

export const PaginationDivider = component$(() => {
  return <span>...</span>;
});

/**
 * Pagination
 * ----------
 * A pagination component
 * first page is 1
 *
 * @example
 * <Pagination pages={15} page={store.page} onPaging$={incrementCount} />
 */
export const Pagination = component$(
  ({
    RenderItem = RenderPaginationItem,
    RenderDivider = PaginationDivider,
    onPaging$,
    page,
    pages,
  }: IPaginationProps) => {
    const pagi = getPaginationItems(pages, page);

    const _onPaging$ = $((page: number) => {
      if (page < 1 || page > pages) return;
      onPaging$(page);
    });

    return (
      <>
        <RenderItem
          onClick$={() => _onPaging$(page - 1)}
          disabled={!pagi.prev}
          aria-label="Previous page"
          value={'prev'}
        />
        {pagi.before !== -1 && (
          <>
            <RenderItem
              onClick$={() => _onPaging$(pagi.before)}
              aria-label="Page 1"
              value={pagi.before}
            />
            <RenderDivider />
          </>
        )}
        {pagi.items.map((item) => (
          <RenderItem
            key={item}
            onClick$={() => _onPaging$(item)}
            aria-label={`Page ${item}`}
            aria-current={item === page}
            value={item}
          />
        ))}
        {pagi.after !== -1 && (
          <>
            <RenderDivider />
            <RenderItem
              aria-label={`Page ${pagi.after}`}
              onClick$={() => _onPaging$(pagi.after)}
              value={pagi.after}
            />
          </>
        )}
        <RenderItem
          aria-label={`Next page`}
          onClick$={() => _onPaging$(page + 1)}
          disabled={!pagi.next}
          value={'next'}
        />
      </>
    );
  }
);
