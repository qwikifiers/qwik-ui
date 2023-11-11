import { component$, Slot } from '@builder.io/qwik';
import { Separator } from '@qwik-ui/headless';
import { PreviewCodeExampleTabsDeprecated } from '~/components/preview-code-example/preview-code-example-tabs-deprecated';

export const MainExample = component$(() => {
  return (
    <PreviewCodeExampleTabsDeprecated>
      <div q:slot="actualComponent">
        <div class="text-white">
          <div>
            <h1 class="text-lg">Qwik UI Headless</h1>
            <p class="text-sm">Accessible, Unstyled Qwik UI Components</p>
          </div>
          <Separator
            orientation="horizontal"
            class="bg-qwikui-blue-200 dark:bg-qwikui-purple-200 my-1 h-px"
          />
          <menu class="flex gap-2">
            <li>
              <a class="border-none" href="/docs/headless/introduction/">
                Introduction
              </a>
            </li>
            <Separator
              orientation="vertical"
              class="bg-qwikui-blue-200 dark:bg-qwikui-purple-200 mx-1 w-px"
            />
            <li>
              {' '}
              <a class="border-none" href="/docs/headless/install/">
                Installation
              </a>
            </li>
            <Separator
              orientation="vertical"
              class="bg-qwikui-blue-200 dark:bg-qwikui-purple-200 mx-1 w-px"
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
    </PreviewCodeExampleTabsDeprecated>
  );
});
