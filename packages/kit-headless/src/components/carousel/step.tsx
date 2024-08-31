import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useComputed$,
  useContext,
  $,
} from '@builder.io/qwik';
import { carouselContextId } from './context';

type AllowedElements = 'button' | 'a' | 'div' | 'span';

type StepProps = {
  _index?: number;
};

export const CarouselStep = component$(
  <C extends AllowedElements = 'button'>(
    props: QwikIntrinsicElements[C] & { as?: C } & StepProps,
  ) => {
    const context = useContext(carouselContextId);
    const { as, _index, ...rest } = props;
    const Comp = as ?? 'button';

    // TODO: add aria-current="step" and data-current

    const localIndexSig = useComputed$(() => _index ?? 0);
    const isCurrentSig = useComputed$(() =>
      context.currentIndexSig.value === _index ? 'step' : undefined,
    );

    const handleClick$ = $(() => {
      context.currentIndexSig.value = localIndexSig.value;
    });

    return (
      <>
        {/* @ts-expect-error annoying polymorphism */}
        <Comp
          data-qui-carousel-step
          aria-current={isCurrentSig.value}
          data-current={isCurrentSig.value}
          data-step={localIndexSig.value + 1}
          {...(Comp === 'button' && { onClick$: [handleClick$, rest.onClick$] })}
          {...rest}
        >
          <Slot />
        </Comp>
      </>
    );
  },
);
