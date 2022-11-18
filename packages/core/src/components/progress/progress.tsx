import { component$ } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface ProgressProps extends WithClassesProp {
  value: string;
  max: string;
}

export const Progress = component$(
  ({
    value,
    max,
    class: classProp = '',
    className = '',
    ...props
  }: ProgressProps) => {
    const cssClass = cn('progress w-56', classProp, className);
    return <progress class={cssClass} value={value} max={max} {...props} />;
  }
);
