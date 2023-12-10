import { component$ } from '@builder.io/qwik';
import { Separator } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <div>
        <div>
          <div>
            <h1 class="text-lg">Qwik UI Headless</h1>
            <p class="text-sm">Accessible, Unstyled Qwik UI Components</p>
          </div>
          <Separator orientation="horizontal" class="bg-foreground my-1 h-px" />
          <menu class="flex gap-2">
            <li>
              <a class="border-none" href="/docs/headless/introduction/">
                Introduction
              </a>
            </li>
            <Separator orientation="vertical" class="bg-foreground mx-1 w-px" />
            <li>
              {' '}
              <a class="border-none" href="/docs/headless/install/">
                Installation
              </a>
            </li>
            <Separator orientation="vertical" class="bg-foreground mx-1 w-px" />
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
