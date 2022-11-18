import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface CardActionsProps extends WithClassesProp {}

export const CardActions = component$(
  ({ class: classProp = '', className = '', ...props }: CardActionsProps) => {
    const cssClass = cn('card-actions', classProp, className);
    return (
      <div className={cssClass} {...props}>
        <Slot />
      </div>
    );
  }
);
