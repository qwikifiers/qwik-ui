import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface DrawerContentProps extends WithClassesProp {}

export const DrawerContent = component$(
  ({ class: classProp = '', className = '', ...props }: DrawerContentProps) => {
    const cssClass = cn('drawer-content', classProp, className);
    return (
      <div className={cssClass} {...props}>
        <Slot name="drawer-content" />
        <Slot name="drawer-trigger" />
      </div>
    );
  }
);
