import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import styles from './menu.css?inline';

type Props = {
  library: string;
};

export const Menu = component$<Props>(({ library }) => {
  useStylesScoped$(styles);

  return (
    <aside class="aside">
      <h5 class="title">Components</h5>
      <ul>
        <li>
          <Link href={`/docs/${library.toLowerCase()}/collapse`}>
            <span class="subtitle">Collapse</span>
          </Link>
        </li>
        <li>
          <Link href={`/docs/${library.toLowerCase()}/drawer`}>
            <span class="subtitle">Drawer</span>
          </Link>
        </li>
        <li>
          <Link href={`/docs/${library.toLowerCase()}/tabs`}>
            <span class="subtitle">Tabs</span>
          </Link>
        </li>
        <li>
          <Link href={`/docs/${library.toLowerCase()}/toogle`}>
            <span class="subtitle">Toogle</span>
          </Link>
        </li>
        <li>
          <Link href={`/docs/${library.toLowerCase()}/tooltip`}>
            <span class="subtitle">Tooltip</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
});
