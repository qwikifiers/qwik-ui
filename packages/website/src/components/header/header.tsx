import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <h1 class="">qwik ui</h1>
      </div>
      <ul>
        <li>
          <a href="#" target="_blank"></a>
        </li>
      </ul>
    </header>
  );
});
