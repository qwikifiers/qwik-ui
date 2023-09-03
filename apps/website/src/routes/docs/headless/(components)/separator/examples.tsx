import { component$, Slot } from '@builder.io/qwik';
import { Separator } from '@qwik-ui/headless';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';

export const MainExample = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <div>
          <h1 class="text-lg">Qwik UI Headless</h1>
          <p class="text-sm">Accessible, Unstyled Qwik UI Components</p>
        </div>
        <Separator orientation="horizontal" class="bg-primary my-1 h-px" />
        <menu class="flex gap-2">
          <li>
            <a href="/docs/headless/introduction/">Introduction</a>
          </li>
          <Separator orientation="vertical" class="bg-primary mx-1 w-px" />
          <li>
            <a href="/docs/headless/install/">Installation</a>
          </li>
          <Separator orientation="vertical" class="bg-primary mx-1 w-px" />
          <li>
            <a href="/docs/headless/contributing/">Contributing</a>
          </li>
        </menu>
      </div>
      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
