import { $, component$, useComputed$ } from '@builder.io/qwik';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version as headlessVersion } from '../../../../../packages/kit-headless/package.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useLocation } from '@builder.io/qwik-city';
import { KitName } from 'apps/website/src/_state/kit-name.type';
import { useAppState } from 'apps/website/src/_state/use-app-state';
import { version as fluffyVersion } from '../../../../../packages/kit-fluffy/package.json';
import { CloseIcon } from '../icons/CloseIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';
import { Logo } from '../icons/logo';
import { useSelectedKit } from '~/routes/docs/use-selected-kit';

export interface HeaderProps {
  showVersion?: boolean;
  showBottomBorder?: boolean;
}

export default component$(
  ({ showVersion = false, showBottomBorder = false }: HeaderProps) => {
    const rootStore = useAppState();
    const selectedKitSig = useSelectedKit();
    const location = useLocation();

    const isRouteActive = (href: string) => {
      const isLinkActive = location.url.pathname.startsWith(href);
      return `text-slate-600 dark:text-slate-400 hover:text-slate-950 focus:text-slate-950 dark:hover:text-white dark:focus:text-white
        transition-color ease-step duration-300 ${
          isLinkActive ? 'font-bold !text-slate-950 dark:!text-white' : ''
        }`;
    };

    const isDocsActive = (baseHref: string) => {
      const isLinkActive = location.url.pathname.startsWith(baseHref);
      return `text-slate-600 dark:text-slate-400 hover:text-slate-950 focus:text-slate-950 dark:hover:text-white dark:focus:text-white
        transition-color ease-step duration-300 ${
          isLinkActive ? 'font-bold !text-slate-950 dark:!text-white' : ''
        }`;
    };

    const kitSignal = useComputed$(() => {
      if (selectedKitSig.value === KitName.HEADLESS) {
        return {
          name: 'Headless',
          version: headlessVersion,
        };
      }
      if (selectedKitSig.value === KitName.FLUFFY) {
        return {
          name: 'Fluffy',
          version: fluffyVersion,
        };
      }
    });

    const toggleDarkMode = $(() => {
      rootStore.mode = rootStore.mode === 'light' ? 'dark' : 'light';
    });

    // we can add back the header animation if you'd like. Maybe something springy with motion?
    return (
      <header
        class={[
          `sticky top-0 z-20 flex h-20 w-full items-center gap-8 border-b-[1px] border-slate-200 bg-white  p-4 dark:border-slate-800 dark:bg-slate-900 md:h-20`,
          `shadow-light-low dark:shadow-dark-medium`,
          rootStore.isSidebarOpened
            ? 'bg-blue-200 brightness-75 dark:bg-indigo-900'
            : 'bg-[var(--color-bg)]',
          showBottomBorder ? `shadow-light-low dark:shadow-dark-medium` : ``,
        ]}
      >
        <section class="mr-auto flex flex-col gap-1 md:flex-row md:gap-8">
          <a href="/" aria-label="Qwik UI Logo" class="lg:ml-8">
            <Logo />
          </a>

          {showVersion && (
            <div data-tip="Qwik-UI Version" class="mr-auto">
              <div class="ml-2 flex flex-row gap-1 text-xs md:mt-1 md:flex-col md:text-sm">
                <span> {kitSignal.value?.name} Kit </span>
                <span> v.{kitSignal.value?.version} </span>
              </div>
            </div>
          )}
        </section>

        <nav class="hidden gap-4 lg:flex">
          <a class={isRouteActive('/about')} href="/about">
            About
          </a>
          <a class={isDocsActive('/docs/headless/')} href="/docs/headless/introduction">
            Headless Kit
          </a>
          {rootStore.featureFlags?.showFluffy && (
            <a class={isDocsActive('/docs/fluffy/')} href="/docs/fluffy/introduction">
              Fluffy (styled) Kit
            </a>
          )}
          <a
            class={isRouteActive('https://discord.gg/PVWUUejrez')}
            href="https://discord.gg/PVWUUejrez"
            target="_blank"
          >
            Community
          </a>
          {/* <a href="/contact">Contact</a> */}
        </nav>

        <button type="button" aria-label="Toggle dark mode" onClick$={toggleDarkMode}>
          {rootStore.mode === 'dark' ? <MoonIcon /> : <SunIcon />}
        </button>
        <a
          target="_blank"
          href="https://github.com/qwikifiers/qwik-ui"
          aria-label="Qwik-UI GitHub repository"
          class="sm:mr-8"
        >
          <GitHubIcon />
        </a>
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick$={() => {
            rootStore.isSidebarOpened = !rootStore.isSidebarOpened;
          }}
          class="block lg:hidden"
        >
          {rootStore.isSidebarOpened ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>
    );
  },
);
