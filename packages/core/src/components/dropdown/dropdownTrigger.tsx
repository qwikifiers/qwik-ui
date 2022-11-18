import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface DropdownTriggerProps extends WithClassesProp {}

export const DropdownTrigger = component$(
  ({
    class: classProp = '',
    className = '',
    ...props
  }: DropdownTriggerProps) => {
    const cssClass = cn('btn', classProp, className);
    return (
      <label tabIndex={0} className={cssClass} {...props}>
        <Slot />
      </label>
    );
  }
);
