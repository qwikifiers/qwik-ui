import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Types } from '../../routes/layout';
import styles from './menu.css?inline';

type Props = {
  library: Types;
};

export const Menu = component$<Props>(({ library }) => {
  useStylesScoped$(styles);

  return (
    <aside class="aside">
      <h5 class="title">Components</h5>
      <ul>
        <li>
          <Link href={`/${library.toLowerCase()}/collapse`}>
            <span class="subtitle">Collapse</span>
          </Link>
        </li>
        <li>
          <Link href={`/${library.toLowerCase()}/toogle`}>
            <span class="subtitle">Toogle</span>
          </Link>
        </li>
        <li>
          <Link href={`/${library.toLowerCase()}/tabs`}>
            <span class="subtitle">Tabs</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
});
