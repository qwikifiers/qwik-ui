import { type PropsOf, component$, Slot } from '@qwik.dev/core';

type CarouselPaginationProps = PropsOf<'div'>;

export const CarouselPagination = component$(({ ...props }: CarouselPaginationProps) => {
  return (
    <div role="tablist" {...props}>
      <Slot />
    </div>
  );
});
