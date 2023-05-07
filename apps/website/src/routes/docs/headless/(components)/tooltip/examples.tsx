import { Slot, component$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';
import { GitHubIcon } from 'apps/website/src/components/icons/GitHubIcon';
import { PreviewCodeExample } from 'apps/website/src/components/preview-code-example/preview-code-example';

export const MainExample = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Tooltip
          content="I'm a tooltip!"
          class="bg-slate-200 dark:bg-gray-900 p-4 rounded-xl"
        >
          Hover over me!
        </Tooltip>
      </div>
      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const Example1 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Tooltip
          content="Clicking this icon takes you to Qwik UI's GitHub repository!"
          class="bg-slate-200 dark:bg-gray-900 p-4 rounded-xl"
        >
          <a href="https://github.com/qwikifiers/qwik-ui" class="mx-auto">
            <GitHubIcon />
          </a>
        </Tooltip>
      </div>
      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
