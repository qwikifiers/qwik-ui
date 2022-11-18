import { component$, PropFunction } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface NavbarProps extends WithClassesProp {
  links: string[];
  onClick: PropFunction<(index: number) => void>;
}

export const Navbar = component$(
  ({
    links,
    onClick,
    class: classProp = '',
    className = '',
    ...props
  }: NavbarProps) => {
    const cssClass = cn('navbar bg-base-100', classProp, className);
    return (
      <div class={cssClass} {...props}>
        {links.map((link, i) => (
          <a
            class="btn btn-ghost normal-case text-xl"
            onClick$={() => onClick(i)}
          >
            {link}
          </a>
        ))}
      </div>
    );
  }
);
