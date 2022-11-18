import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface ModalTriggerProps extends WithClassesProp {
  id: string;
}

export const ModalTrigger = component$(
  ({
    id,
    class: classProp = '',
    className = '',
    ...props
  }: ModalTriggerProps) => {
    const cssClass = cn('btn', classProp, className);
    return (
      <label for={id} className={cssClass} {...props}>
        <Slot />
      </label>
    );
  }
);
