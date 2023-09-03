import { $, component$, useComputed$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version as headlessVersion } from '../../../../../../packages/kit-headless/package.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { KitName } from 'apps/website/src/_state/kit-name.type';
import { useRootStore } from 'apps/website/src/_state/use-root-store';
import { version as fluffyVersion } from '../../../../../../packages/kit-fluffy/package.json';
import { useSelectedKit } from '../../docs/use-selected-kit';
import { CloseIcon } from '../icons/CloseIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';
import { Logo } from '../icons/logo';

export interface HeaderProps {
  showVersion?: boolean;
  showBottomBorder?: boolean;
}

export default component$(
  ({ showVersion = false, showBottomBorder = false }: HeaderProps) => {
    const rootStore = useRootStore();
    const location = useLocation();
    const selectedKitSig = useSelectedKit();

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

    return (
      <header
        class={[
          `fixed top-0 z-20 flex h-20 w-full items-center gap-8 p-4 md:h-20 md:bg-[var(--color-bg)]`,
          `duration-300 ease-in-out`,
          rootStore.isSidebarOpened
            ? 'bg-blue-200 brightness-75 dark:bg-indigo-900'
            : 'bg-[var(--color-bg)]',
          showBottomBorder ? `border-b-[1px] border-slate-300 dark:border-slate-600` : ``,
        ]}
      >
        <section class="mr-auto flex flex-col gap-1 md:flex-row md:gap-8">
          <a href="/" class="lg:ml-8">
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
          <a href="/about">About</a>
          <a href="/docs/headless/introduction">Headless Kit</a>
          {rootStore.featureFlags?.showFluffy && (
            <a href="/docs/fluffy/introduction">Fluffy (styled) Kit</a>
          )}
          <a href="https://discord.gg/PVWUUejrez" target="_blank">
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
