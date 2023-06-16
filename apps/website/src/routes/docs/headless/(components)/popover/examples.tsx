import { Slot, component$ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '@qwik-ui/headless';
import { GitHubIcon } from 'apps/website/src/components/icons/GitHubIcon';
import { PreviewCodeExample } from 'apps/website/src/components/preview-code-example/preview-code-example';

export const MainExample = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Popover>
          <PopoverContent>
            <div class="p-4 bg-gray-500">Hi, I'm the content</div>
          </PopoverContent>
          <PopoverTrigger> Click on me </PopoverTrigger>
        </Popover>
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
        <Popover placement="top">
          <PopoverContent>
            <div class="p-4 bg-gray-500">
              Hi, I'm the content, but now on top
            </div>
          </PopoverContent>
          <PopoverTrigger> Click on me </PopoverTrigger>
        </Popover>
      </div>
      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
