import {
  component$,
  type PropsOf,
  Slot,
  type Signal,
  $,
  useContextProvider,
  sync$,
} from '@builder.io/qwik';
import { useBoundSignal } from '../../utils/bound-signal';
import { CheckboxContext } from './checkbox-context';
import type { QwikIntrinsicElements } from '@builder.io/qwik';

type AllowedElements = 'li' | 'div' | 'span';

export type CheckboxProps = {
  'bind:checked'?: Signal<boolean>;
  initialValue?: boolean;
  index?: number;
} & PropsOf<'div'>;

export const CheckboxRoot = component$(
  <C extends AllowedElements = 'div'>(
    props: QwikIntrinsicElements[C] & { as?: C } & CheckboxProps,
  ) => {
    const { 'bind:checked': givenCheckedSig, initialValue, as, ...rest } = props;
    const Comp = as ?? 'div';

    const checkedSignal = useBoundSignal(givenCheckedSig, initialValue);

    useContextProvider(CheckboxContext, checkedSignal);
    const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
      }
    });

    const handleClick$ = $(() => {
      checkedSignal.value = !checkedSignal.value;
    });

    const handleKeyDown$ = $((e: KeyboardEvent) => {
      if (e.key === ' ') {
        checkedSignal.value = !checkedSignal.value;
      }
    });

    return (
      <>
        {/* @ts-expect-error annoying polymorphism */}
        <Comp
          {...rest}
          tabIndex={0}
          role="checkbox"
          aria-checked={checkedSignal.value}
          aria-labelledby={props['aria-labelledby']}
          // need the onClick$ to work with the handleClick$ below
          // onClick$={onClick$ || handleClick$}
          onClick$={handleClick$}
          onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
          onKeyPress$={handleClick$}
          data-qds-checkbox-root
        >
          <Slot />
        </Comp>
      </>
    );
  },
);
