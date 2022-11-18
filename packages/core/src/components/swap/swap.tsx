import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface SwapProps extends WithClassesProp {
  rotate?: boolean;
  flip?: boolean;
}

export const Swap = component$(
  ({
    rotate,
    flip,
    class: classProp = '',
    className = '',
    ...props
  }: SwapProps) => {
    const cssClass = cn(
      'swap',
      {
        'swap-rotate': rotate,
        'swap-flip': flip,
      },
      classProp,
      className
    );
    return (
      <label className={cssClass} {...props}>
        <input type="checkbox" />
        <div className="swap-on">
          <Slot name="swap-on" />
        </div>
        <div className="swap-off">
          <Slot name="swap-off" />
        </div>
      </label>
    );
  }
);
