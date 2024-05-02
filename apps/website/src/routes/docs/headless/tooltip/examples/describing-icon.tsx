import { component$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';
import { GitHubIcon } from '~/components/icons/GitHubIcon';

export default component$(() => {
  return (
    <>
      <div>
        <Tooltip.Root
          content="Clicking this icon takes you to Qwik UI's GitHub repository!"
          class="rounded-base bg-slate-200 p-4 dark:bg-gray-900"
        >
          <a href="https://github.com/qwikifiers/qwik-ui" class="mx-auto">
            <GitHubIcon />
          </a>
        </Tooltip.Root>
      </div>
    </>
  );
});
