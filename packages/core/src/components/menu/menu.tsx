import { component$, PropFunction } from '@builder.io/qwik';

interface MenuProps {
  class?: string;
  className?: string;
  items: string[];
  onClick: PropFunction<(index: number) => void>;
  isHorizontal?: boolean;
}

export const Menu = component$(
  ({ items, onClick, isHorizontal, ...props }: MenuProps) => {
    return (
      <ul
        class={`menu bg-base-100 ${isHorizontal ? 'menu-horizontal' : ''}`}
        {...props}
      >
        {items.map((item, i) => (
          <li>
            <a onClick$={() => onClick(i)}>{item}</a>
          </li>
        ))}
      </ul>
    );
  }
);
