import { $, component$, useComputed$, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version as headlessVersion } from '../../../../../../packages/kit-headless/package.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useRootStore } from 'apps/website/src/_state/use-root-store';
import { version as tailwindVersion } from '../../../../../../packages/kit-tailwind/package.json';
import { CloseIcon } from '../icons/CloseIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';
import { Menu } from '../menu/menu';
import { SvgLogo } from './svg-logo';

export interface HeaderProps {
  showVersion?: boolean;
  showBottomBorder?: boolean;
}

export default component$(
  ({ showVersion = false, showBottomBorder = false }: HeaderProps) => {
    const rootStore = useRootStore();
    const location = useLocation();

    const menuOpenSignal = useSignal(false);

    const kitSignal = useComputed$(() => {
      if (location.url.pathname.indexOf('headless') !== -1) {
        return {
          name: 'Headless',
          version: headlessVersion,
        };
      }
      if (location.url.pathname.indexOf('tailwind') !== -1) {
        return {
          name: 'Tailwind',
          version: tailwindVersion,
        };
      }
    });

    const toggleMenu$ = $(() => {
      menuOpenSignal.value = !menuOpenSignal.value;
    });

    const toggleDarkMode = $(() => {
      rootStore.mode = rootStore.mode === 'light' ? 'dark' : 'light';
    });

    return (
      <header
        class={[
          `fixed top-0 w-full h-20 z-20 bg-[var(--color-bg)] flex gap-8 p-4 items-center`,
          showBottomBorder
            ? `border-b-[1px] border-slate-300 dark:border-slate-600`
            : ``,
        ]}
      >
        {menuOpenSignal.value && (
          <aside class="fixed top-20 left-0 lg:hidden">
            <div
              onClick$={toggleMenu$}
              class="fixed h-screen w-screen bg-gray-900/20 backdrop-blur-sm"
            ></div>
            <div class="fixed h-screen w-screen sm:w-80 overflow-y-scroll bg-white dark:bg-[var(--color-bg)]">
              <Menu onClose$={toggleMenu$} />
            </div>
          </aside>
        )}

        <a href="/" class="lg:ml-8">
          <SvgLogo />
        </a>

        <div data-tip="Qwik-UI Version" class="mr-auto">
          {showVersion && (
            <div class="flex flex-col">
              <span> {kitSignal.value?.name} Kit </span>
              <span> v.{kitSignal.value?.version} </span>
            </div>
          )}
        </div>

        <nav class="hidden sm:flex gap-4">
          <a href="/about">About</a>
          <a href="/docs/headless/introduction">Headless Kit</a>
          {rootStore.featureFlags?.showTailwind && (
            <a href="/docs/tailwind/introduction">Tailwind Kit</a>
          )}
          <a href="https://discord.gg/PVWUUejrez" target="_blank">
            Community
          </a>
          {/* <a href="/contact">Contact</a> */}
        </nav>

        <button
          type="button"
          aria-label="Toggle dark mode"
          onClick$={toggleDarkMode}
        >
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
          onClick$={toggleMenu$}
          class="block lg:hidden"
        >
          {menuOpenSignal.value ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>
    );
  }
);
