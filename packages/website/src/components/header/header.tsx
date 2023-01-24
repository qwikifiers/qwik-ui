import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <img src="/qwik-ui.png" style={'width: 200px'} />
      </div>
    </header>
  );
});
