import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { ColorTypes, WithClassesProp } from '../../types';

interface BadgeProps extends WithClassesProp {
  color?: ColorTypes;
  withOutline?: boolean;
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
