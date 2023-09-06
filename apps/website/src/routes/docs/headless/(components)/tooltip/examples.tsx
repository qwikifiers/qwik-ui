import { Slot, component$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';
import { GitHubIcon } from 'apps/website/src/routes/_components/icons/GitHubIcon';
import { PreviewCodeExample } from 'apps/website/src/routes/docs/_components/preview-code-example/preview-code-example';

export const MainExample = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Tooltip
          offset={8}
          content="I'm a tooltip!"
          class="bg-slate-800 p-4 rounded-xl text-white border-2 border-slate-400 shadow-dark-medium"
        >
          <span class="text-white">Hover over me!</span>
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
          class="bg-slate-800 p-4 rounded-xl text-white border-2 border-slate-400 shadow-dark-medium"
          offset={8}
        >
          <a
            href="https://github.com/qwikifiers/qwik-ui"
            class="block border-none text-white"
          >
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
