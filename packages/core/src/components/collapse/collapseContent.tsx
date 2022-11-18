import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface CollapseContentProps extends WithClassesProp {}

export const CollapseContent = component$(
  ({
    class: classProp = '',
    className = '',
    ...props
  }: CollapseContentProps) => {
    const cssClass = cn('collapse-content', classProp, className);
    return (
      <div className={cssClass} {...props}>
        <Slot />
      </div>
    );
  }
);
