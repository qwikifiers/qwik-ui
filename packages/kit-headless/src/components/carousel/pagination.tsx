import { type PropsOf, component$, Slot } from '@builder.io/qwik';

type CarouselPaginationProps = PropsOf<'div'>;

export const CarouselPagination = component$(({ ...props }: CarouselPaginationProps) => {
  return (
    <div role="tablist" {...props}>
      <Slot />
    </div>
  );
});
