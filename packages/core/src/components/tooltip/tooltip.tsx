import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { ColorTypes, Positions, WithClassesProp } from '../../types';

interface TooltipProps extends WithClassesProp {
  tip: string;
  type?: ColorTypes;
  position?: Positions;
}

export const Tooltip = component$(
  ({
    tip,
    position = 'top',
    type,
    class: classProp = '',
    className = '',
    ...props
  }: TooltipProps) => {
    const cssClass = cn(
      'tooltip',
      {
        [`tooltip-${position}`]: true,
        [`tooltip-${type}`]: type,
      },
      classProp,
      className
    );
    return (
      <div className={cssClass} data-tip={tip} {...props}>
        <Slot />
      </div>
    );
  }
);
