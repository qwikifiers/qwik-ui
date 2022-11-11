import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <a href="https://github.com/qwikifiers/qwik-ui" target="_blank">
          <QwikLogo />
        </a>
      </div>
    </header>
  );
});
