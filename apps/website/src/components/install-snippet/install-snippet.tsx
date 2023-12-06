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
      class="shadow-light-medium dark:shadow-dark-medium mx-[-24px] mb-12 rounded-lg text-white lg:mx-[-32px]"
      behavior="manual"
    >
      <TabList class="bg-qwikui-blue-700 dark:bg-qwikui-purple-800 border-qwikui-blue-300 dark:border-qwikui-purple-200 flex rounded-t-lg border-[1.5px] border-b-0 text-white">
        {Object.keys(packages).map((key, index) => (
          <Tab
            key={index}
            class="hover:bg-qwikui-blue-600 dark:hover:bg-qwikui-purple-500 text-outline-lg ease-step transition-color aria-selected:bg-qwikui-blue-500 dark:aria-selected:bg-qwikui-purple-600  min-h-[44px] px-[28px] py-2 transition first-of-type:rounded-tl-[.325rem] aria-selected:font-bold"
          >
            {key}
          </Tab>
        ))}
      </TabList>
      {Object.entries(packages).map(([key, value], index) => (
        <TabPanel
          key={index}
          class="shadow-light-medium dark:shadow-dark-medium border-qwikui-blue-300 dark:border-qwikui-purple-200 rounded-b-lg border-[1.5px] bg-slate-200 bg-slate-800 px-[28px] py-6 dark:bg-slate-900"
        >
          <div class="flex items-center justify-between">
            {value}
            <CodeCopy
              code={value}
              class="p-4 hover:bg-slate-700 dark:hover:bg-slate-800"
              icon={true}
            />
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
});
