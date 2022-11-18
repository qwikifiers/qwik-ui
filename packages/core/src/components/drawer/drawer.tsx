import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface DrawerProps extends WithClassesProp {
  id: string;
}

export const Drawer = component$(
  ({ id, class: classProp = '', className = '', ...props }: DrawerProps) => {
    const cssClass = cn('drawer', classProp, className);
    return (
      <div className={cssClass} {...props}>
        <input id={id} type="checkbox" className="drawer-toggle" />
        <Slot />
      </div>
    );
  }
);
