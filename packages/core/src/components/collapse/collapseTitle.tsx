import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface CollapseTitleProps extends WithClassesProp {}

export const CollapseTitle = component$(
  ({ class: classProp = '', className = '', ...props }: CollapseTitleProps) => {
    const cssClass = cn('collapse-title', classProp, className);
    return (
      <div className={cssClass} {...props}>
        <Slot />
      </div>
    );
  }
);
