import { component$, Slot } from '@builder.io/qwik';
import { Separator } from '@qwik-ui/headless';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';

export const MainExample = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <div class="text-white">
          <div>
            <h1 class="text-lg">Qwik UI Headless</h1>
            <p class="text-sm">Accessible, Unstyled Qwik UI Components</p>
          </div>
          <Separator
            orientation="horizontal"
            class="h-px my-1 bg-qwikui-blue-200 dark:bg-qwikui-purple-200"
          />
          <menu class="flex gap-2">
            <li>
              <a class="border-none" href="/docs/headless/introduction/">
                Introduction
              </a>
            </li>
            <Separator
              orientation="vertical"
              class="w-px mx-1 bg-qwikui-blue-200 dark:bg-qwikui-purple-200"
            />
            <li>
              {' '}
              <a class="border-none" href="/docs/headless/install/">
                Installation
              </a>
            </li>
            <Separator
              orientation="vertical"
              class="w-px mx-1 bg-qwikui-blue-200 dark:bg-qwikui-purple-200"
            />
            <li>
              <a class="border-none" href="/docs/headless/contributing/">
                Contributing
              </a>
            </li>
          </menu>
        </div>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
