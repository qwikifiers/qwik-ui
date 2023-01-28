import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import styles from './menu.css?inline';

export const generateMenu = (library: string) => [
  { label: 'Button', path: `/docs/${library.toLowerCase()}/button` },
  { label: 'Collapse', path: `/docs/${library.toLowerCase()}/collapse` },
  { label: 'Drawer', path: `/docs/${library.toLowerCase()}/drawer` },
  { label: 'Select', path: `/docs/${library.toLowerCase()}/select` },
  { label: 'Tabs', path: `/docs/${library.toLowerCase()}/tabs` },
  { label: 'Toogle', path: `/docs/${library.toLowerCase()}/toogle` },
  { label: 'Tooltip', path: `/docs/${library.toLowerCase()}/tooltip` },
];

type Props = {
  library: string;
};

export const Menu = component$<Props>(({ library }) => {
  useStylesScoped$(styles);
  const menu = generateMenu(library);

  return (
    <aside class="aside">
      <h5 class="title">Components</h5>
      <ul>
        {menu.map((menuItem) => (
          <li>
            <Link href={menuItem.path}>
              <span className="subtitle">{menuItem.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
});
