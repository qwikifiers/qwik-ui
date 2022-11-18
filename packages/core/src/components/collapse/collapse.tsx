import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface CollapseProps extends WithClassesProp {
  showArrow?: boolean;
  showPlus?: boolean;
}

export const Collapse = component$(
  ({
    showArrow = false,
    showPlus = false,
    class: classProp = '',
    className = '',
    ...props
  }: CollapseProps) => {
    const cssClass = cn(
      'collapse border border-base-300 bg-base-100 rounded-box',
      {
        'collapse-arrow': showArrow && !showPlus,
        'collapse-plus': showPlus && !showArrow,
      },
      classProp,
      className
    );
    return (
      <div tabIndex={0} className={cssClass} {...props}>
        <input type="checkbox" />
        <Slot />
      </div>
    );
  }
);
