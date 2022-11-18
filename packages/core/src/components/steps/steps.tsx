import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface StepsProps extends WithClassesProp {
  isVertical: boolean;
}

export const Steps = component$(
  ({
    isVertical = false,
    class: classProp = '',
    className = '',
    ...props
  }: StepsProps) => {
    const cssClass = cn(
      'steps',
      { 'steps-vertical': isVertical },
      classProp,
      className
    );
    return (
      <ul className={cssClass} {...props}>
        <Slot />
      </ul>
    );
  }
);
