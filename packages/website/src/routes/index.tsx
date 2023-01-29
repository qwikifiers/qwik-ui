import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      <div>Root Documentation Page</div>
      <>
        <ul>
          <li>
            <Link href="/install">
              <span class="subtitle">Install</span>
            </Link>
          </li>
          <li>
            <Link href="/use">
              <span class="subtitle">Use</span>
            </Link>
          </li>
          <li>
            <Link href="/docs">
              <span class="subtitle">Components documentation</span>
            </Link>
          </li>
        </ul>
      </>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'QwikUI',
};
