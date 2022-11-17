import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { ColorTypes } from '../../types/types';

interface BadgeProps {
  color?: ColorTypes;
  withOutline?: boolean;
  class?: string;
  className?: string;
}

export const Badge = component$(
  ({
    color,
    withOutline = false,
    class: classProp = '',
    className = '',
    ...props
  }: BadgeProps) => {
    const cssClass = cn('badge', classProp, className, {
      [`badge-${color}`]: color,
      'badge-outline': withOutline,
    });
    return (
      <span class={cssClass} {...props}>
        <Slot />
      </span>
    );
  }
);
