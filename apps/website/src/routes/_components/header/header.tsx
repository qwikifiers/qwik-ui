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
          version: headlessVersion
        };
      }
      if (selectedKitSig.value === KitName.FLUFFY) {
        return {
          name: 'Fluffy',
          version: fluffyVersion
        };
      }
    });

    const toggleDarkMode = $(() => {
      rootStore.mode = rootStore.mode === 'light' ? 'dark' : 'light';
    });

    return (
      <header
        class={[
          `fixed top-0 w-full h-20 md:h-20 z-20 md:bg-[var(--color-bg)] flex gap-8 p-4 items-center`,
          `ease-in-out duration-300`,
          rootStore.isSidebarOpened
            ? 'bg-blue-200 brightness-75 dark:bg-indigo-900'
            : 'bg-[var(--color-bg)]',
          showBottomBorder ? `border-b-[1px] border-slate-300 dark:border-slate-600` : ``
        ]}
      >
        <section class="flex flex-col md:flex-row gap-1 md:gap-8 mr-auto">
          <a href="/" class="lg:ml-8">
            <Logo />
          </a>

          {showVersion && (
            <div data-tip="Qwik-UI Version" class="mr-auto">
              <div class="flex flex-row gap-1 ml-2 md:mt-1 md:flex-col text-xs md:text-sm">
                <span> {kitSignal.value?.name} Kit </span>
                <span> v.{kitSignal.value?.version} </span>
              </div>
            </div>
          )}
        </section>

        <nav class="hidden lg:flex gap-4">
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
  }
);
