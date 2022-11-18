import { component$ } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface DrawerTriggerProps extends WithClassesProp {
  id: string;
  label: string;
}

export const DrawerTrigger = component$(
  ({
    id,
    label,
    class: classProp = '',
    className = '',
    ...props
  }: DrawerTriggerProps) => {
    const cssClass = cn('btn btn-primary drawer-button', classProp, className);
    return (
      <label for={id} className={cssClass} {...props}>
        {label}
      </label>
    );
  }
);
