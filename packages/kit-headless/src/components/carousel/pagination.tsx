import { type PropsOf, component$, Slot } from '@builder.io/qwik';

/* Why we use the range util: 
https://www.joshwcomeau.com/snippets/javascript/range/
*/

type CarouselPaginationProps = PropsOf<'div'>;

export const CarouselPagination = component$(({ ...props }: CarouselPaginationProps) => {
  return (
    <div role="navigation" {...props}>
      <Slot />
    </div>
  );
});
