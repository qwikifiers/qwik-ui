import { component$, PropFunction } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface RangeProps extends WithClassesProp {
  value?: number;
  min?: number;
  max?: number;
  onChange$?: PropFunction<(evt: any) => void>;
}

export const Range = component$(
  ({
    value = 0,
    min,
    max,
    class: classProp = '',
    className = '',
    ...props
  }: RangeProps) => {
    const cssClass = cn('range', classProp, className);
    return (
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        className={cssClass}
        onChange$={props.onChange$}
        {...props}
      />
    );
  }
);
