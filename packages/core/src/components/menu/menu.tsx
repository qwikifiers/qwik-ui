import { component$, PropFunction } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface MenuProps extends WithClassesProp {
  items: string[];
  onClick: PropFunction<(index: number) => void>;
  isHorizontal?: boolean;
}

export const Menu = component$(
  ({
    items,
    onClick,
    isHorizontal,
    class: classProp = '',
    className = '',
    ...props
  }: MenuProps) => {
    const cssClass = cn(
      'menu bg-base-100',
      { 'menu-horizontal': isHorizontal },
      classProp,
      className
    );
    return (
      <ul class={cssClass} {...props}>
        {items.map((item, i) => (
          <li>
            <a onClick$={() => onClick(i)}>{item}</a>
          </li>
        ))}
      </ul>
    );
  }
);
