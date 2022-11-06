import { component$, PropFunction } from '@builder.io/qwik';

interface MenuProps {
  class?: string;
  className?: string;
  items: string[];
  onClick: PropFunction<(index: number) => void>;
}

export const Menu = component$(({ items, onClick, ...props }: MenuProps) => {
  return (
    <ul class="menu bg-base-100 w-56" {...props}>
      {items.map((item, i) => (
        <li>
          <a onClick$={() => onClick(i)}>{item}</a>
        </li>
      ))}
    </ul>
  );
});
