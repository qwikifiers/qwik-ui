import { component$, Slot } from '@builder.io/qwik';
import cn from 'classnames';
import { ColorTypes, WithClassesProp } from '../../types';

interface LinkProps extends WithClassesProp {
  type?: ColorTypes | 'neutral' | 'hover';
}

export const Link = component$(
  ({
    type = 'primary',
    class: classProp = '',
    className = '',
    ...props
  }: LinkProps) => {
    const cssClass = cn(
      'link',
      { [`link-${type}`]: true },
      classProp,
      className
    );
    return (
      <a className={cssClass} {...props}>
        <Slot />
      </a>
    );
  }
);
