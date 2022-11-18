import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface DropdownProps extends WithClassesProp {
  openOnHover?: boolean;
}

export const Dropdown = component$(
  ({
    openOnHover,
    class: classProp = '',
    className = '',
    ...props
  }: DropdownProps) => {
    const cssClass = cn(
      'dropdown',
      { 'dropdown-hover': openOnHover },
      classProp,
      className
    );
    return (
      <div class={cssClass} {...props}>
        <Slot />
      </div>
    );
  }
);
