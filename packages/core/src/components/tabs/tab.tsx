import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface TabProps extends WithClassesProp {
  isActive?: boolean;
  isLifted?: boolean;
  isBordered?: boolean;
}

export const Tab = component$(
  ({
    isActive,
    isBordered,
    isLifted,
    class: classProp = '',
    className = '',
    ...props
  }: TabProps) => {
    const cssClass = cn(
      'tab',
      {
        'tab-active': isActive,
        'tab-bordered': isBordered,
        'tab-lifted': isLifted,
      },
      classProp,
      className
    );
    return (
      <a class={cssClass} {...props}>
        <Slot />
      </a>
    );
  }
);
