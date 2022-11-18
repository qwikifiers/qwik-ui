import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface ModalProps extends WithClassesProp {
  id: string;
}

export const Modal = component$(
  ({ id, class: classProp = '', className = '', ...props }: ModalProps) => {
    const cssClass = cn('modal-toggle', classProp, className);
    return (
      <>
        <input type="checkbox" id={id} className={cssClass} {...props} />
        <label for={id} className="modal">
          <Slot />
        </label>
      </>
    );
  }
);
