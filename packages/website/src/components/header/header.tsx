import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header.css?inline';
import { QwikUILogo } from '~/components/icons/qwikuiLogo';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <QwikUILogo />
      </div>
      <ul>
        <li>
          <a href="#" target="_blank"></a>
        </li>
      </ul>
    </header>
  );
});
