import { component$, useStyles$ } from '@qwik.dev/core';
import { Separator } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  return (
    <>
      <div>
        <div>
          <div>
            <h1 class="text-lg">Qwik UI Headless</h1>
            <p class="text-sm">Accessible, Unstyled Qwik UI Components</p>
          </div>
          <Separator orientation="horizontal" class="separator-top" />
          <menu class="flex gap-2">
            <li>
              <a class="border-none" href="/docs/headless/introduction/">
                Introduction
              </a>
            </li>
            <Separator orientation="vertical" class="separator-right" />
            <li>
              {' '}
              <a class="border-none" href="/docs/headless/install/">
                Installation
              </a>
            </li>
            <Separator orientation="vertical" class="separator-left" />
            <li>
              <a class="border-none" href="/docs/headless/contributing/">
                Contributing
              </a>
            </li>
          </menu>
        </div>
      </div>
    </>
  );
});

// internal
import styles from '../snippets/separator.css?inline';
