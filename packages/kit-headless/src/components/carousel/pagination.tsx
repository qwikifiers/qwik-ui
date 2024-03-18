import { type QRL, type PropsOf, component$, useContext } from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';
import { type JSX } from '@builder.io/qwik/jsx-runtime';

/* Why we use the range util: 
https://www.joshwcomeau.com/snippets/javascript/range/
*/

type CarouselPaginationProps = PropsOf<'div'> & {
  renderBullet$?: QRL<(n: number) => JSX.Element>;
};

export const CarouselPagination = component$(
  ({ renderBullet$, ...props }: CarouselPaginationProps) => {
    const context = useContext(CarouselContextId);

    return (
      <div {...props}>
        {Array.from({ length: context.numSlidesSig.value }, (v, i) => i).map((num) => (
          <>
            {renderBullet$ ? (
              renderBullet$(num)
            ) : (
              <div
                key={num}
                {...props}
                aria-current={context.currentIndexSig.value === num}
                data-current-slide={context.currentIndexSig.value === num}
              >
                {num}
              </div>
            )}
          </>
        ))}
      </div>
    );
  },
);
