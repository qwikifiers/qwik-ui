import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { ResponsiveSize, WithClassesProp } from '../../types';

interface KbdProps extends WithClassesProp {
  size?: ResponsiveSize;
}

export const Kbd = component$(
  ({
    size = 'md',
    class: classProp = '',
    className = '',
    ...props
  }: KbdProps) => {
    const cssClass = cn('kbd', { [`kbd-${size}`]: true }, classProp, className);
    return (
      <kbd class={cssClass} {...props}>
        <Slot />
      </kbd>
    );
  }
);
