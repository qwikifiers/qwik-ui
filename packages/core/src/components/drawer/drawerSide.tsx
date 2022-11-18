import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface ModalActionsProps extends WithClassesProp {
  id: string;
}

export const DrawerSide = component$(
  ({
    id,
    class: classProp = '',
    className = '',
    ...props
  }: ModalActionsProps) => {
    const cssClass = cn('drawer-side', classProp, className);
    return (
      <div className={cssClass} {...props}>
        <label for={id} className="drawer-overlay" />
        <Slot />
      </div>
    );
  }
);
