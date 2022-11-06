import { component$, PropFunction } from '@builder.io/qwik';

interface NavbarProps {
  links: string[];
  onClick: PropFunction<(index: number) => void>;
}

export const Navbar = component$(({ links, onClick }: NavbarProps) => {
  return (
    <div class="navbar bg-base-100">
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
});
