import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface StackProps extends WithClassesProp {}

export const Stack = component$(
  ({ class: classProp = '', className = '', ...props }: StackProps) => {
    const cssClass = cn('stack', classProp, className);
    return (
      <a className={cssClass} {...props}>
        <Slot />
      </a>
    );
  }
);
