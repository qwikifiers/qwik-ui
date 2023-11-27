import { QRL, QwikIntrinsicElements, component$, useContext } from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';
import { range } from '../../utils/range';
import { JSX } from '@builder.io/qwik/jsx-runtime';

/* Why we use the range util: 
https://www.joshwcomeau.com/snippets/javascript/range/
*/

type CarouselPaginationProps = QwikIntrinsicElements['span'] & {
  renderBullet$?: QRL<(n: number) => JSX.Element>;
};

export const CarouselPagination = component$(({ ...props }: CarouselPaginationProps) => {
  const context = useContext(CarouselContextId);

  return (
    <>
      {range(1, context.numSlidesSig.value + 1).map((num) => (
        <>
          {/* {renderBullet$ && symbolsArr.length >= num && renderBullet$(num - 1)} */}

          <span
            key={num}
            {...props}
            aria-current={context.currentIndexSig.value === num}
            data-current-slide={context.currentIndexSig.value === num}
          >
            {num}
          </span>
        </>
      ))}
    </>
  );
});
