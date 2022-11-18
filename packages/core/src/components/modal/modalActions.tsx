import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface ModalActionsProps extends WithClassesProp {}

export const ModalActions = component$(
  ({ class: classProp = '', className = '', ...props }: ModalActionsProps) => {
    const cssClass = cn('modal-action', classProp, className);
    return (
      <div className={cssClass} {...props}>
        <Slot />
      </div>
    );
  }
);
