import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface ModalContentProps extends WithClassesProp {}

export const ModalContent = component$(
  ({ class: classProp = '', className = '', ...props }: ModalContentProps) => {
    const cssClass = cn('modal-box', classProp, className);
    return (
      <div className={cssClass} {...props}>
        <Slot />
      </div>
    );
  }
);
