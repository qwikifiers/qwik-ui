import { component$ } from '@builder.io/qwik';
import { Tab, TabList, TabPanel, Tabs } from '@qwik-ui/headless';
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
    <Tabs
      class="shadow-light-medium dark:shadow-dark-medium mx-[-24px] mb-12 rounded-xl lg:mx-[-32px]"
      behavior="manual"
    >
      <TabList class=" flex rounded-t-xl border border-b-0 p-2">
        {Object.keys(packages).map((key, index) => (
          <Tab
            key={index}
            class="hover:bg-accent hover:text-accent-foreground mr-2 rounded-xl border px-2 py-1 hover:font-medium"
          >
            {key}
          </Tab>
        ))}
      </TabList>
      {Object.entries(packages).map(([, value], index) => (
        <TabPanel
          key={index}
          class="shadow-light-medium dark:shadow-dark-medium rounded-b-lg border-[1.5px] bg-slate-800 px-4 py-6 text-white dark:bg-slate-900"
        >
          <div class="flex items-center justify-between">
            {value}
            <CodeCopy
              code={value}
              class="p-4 hover:bg-slate-700 dark:hover:bg-slate-800"
            />
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
});
