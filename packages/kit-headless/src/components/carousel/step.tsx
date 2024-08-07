import { component$, useContext, QwikIntrinsicElements, PropsOf } from '@builder.io/qwik';
import { Polymorphic } from '../polymorphic';
import { carouselContextId } from './context';

type BulletProps<C extends keyof QwikIntrinsicElements = 'div'> = {
  _index?: number;
  as?: C;
} & PropsOf<string extends C ? 'div' : C>;

export const CarouselStep = component$(
  <C extends 'div' | 'button' = 'div'>(
    props: BulletProps<C> & QwikIntrinsicElements[C],
  ) => {
    const context = useContext(carouselContextId);

    const { as = context.isStepInteractionSig.value ? 'button' : 'div', ...rest } = props;

    return <Polymorphic as={as as typeof as} {...(rest as PropsOf<typeof as>)} />;
  },
);
