import { component$ } from '@builder.io/qwik';
import { Tabs } from '@qwik-ui/headless';
import { CodeCopy } from '../code-copy/code-copy';

export const packages = {
  npm: 'npm install @qwik-ui/headless',
  yarn: 'yarn add @qwik-ui/headless',
  pnpm: 'pnpm add @qwik-ui/headless',
};

export const qwikCityPackages = {
  npm: 'npm create qwik@latest',
  yarn: 'yarn create qwik',
  pnpm: 'pnpm create qwik@latest',
  bun: 'bun create qwik@latest',
};

export const astroPackages = {
  npm: 'npm create astro@latest',
  yarn: 'yarn create astro',
  pnpm: 'pnpm create astro@latest',
};

export const qwikAstroCliPackages = {
  npm: 'npx astro add @qwikdev/astro',
  yarn: 'yarn astro add @qwikdev/astro',
  pnpm: 'pnpm astro add @qwikdev/astro',
};

export type InstallSnippetProps = {
  packages: Record<string, string>;
};
export const InstallSnippet = component$<InstallSnippetProps>(({ packages }) => {
  return (
    <Tabs.Root class="mb-12 rounded-base shadow-lg" behavior="manual">
      <Tabs.List class=" flex rounded-t-xl border border-b-0 p-2">
        {Object.keys(packages).map((key, index) => (
          <Tabs.Tab
            key={index}
            class="mr-2 rounded-base border px-2 py-1 hover:bg-accent hover:font-medium hover:text-accent-foreground"
          >
            {key}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {Object.entries(packages).map(([, value], index) => (
        <Tabs.Panel
          key={index}
          class="rounded-b-lg border-[1.5px]  bg-gradient-to-b from-slate-900 to-slate-800 px-4 py-6 text-white shadow-lg dark:from-background dark:to-accent/50"
        >
          <div data-pagefind-ignore="all" class="flex items-center justify-between">
            {value}
            <CodeCopy
              code={value}
              class="p-4 hover:bg-slate-700 dark:hover:bg-slate-800"
            />
          </div>
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
});
