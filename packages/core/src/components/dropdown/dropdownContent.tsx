import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface DropdownContentProps extends WithClassesProp {}

export const DropdownContent = component$(
  ({
    class: classProp = '',
    className = '',
    ...props
  }: DropdownContentProps) => {
    const cssClass = cn(
      'dropdown-content menu rounded-box p-2 shadow bg-base-100 w-52',
      classProp,
      className
    );
    return (
      <ul tabIndex={0} class={cssClass} {...props}>
        <Slot />
      </ul>
    );
  }
);
