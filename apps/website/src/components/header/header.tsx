import { component$, useComputed$ } from '@builder.io/qwik';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version as headlessVersion } from '../../../../../packages/kit-headless/package.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useLocation } from '@builder.io/qwik-city';
import { KitName } from '~/_state/kit-name.type';
import { useAppState } from '~/_state/use-app-state';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useSelectedKit } from '~/routes/docs/use-selected-kit';
import { version as styledKitVersion } from '../../../../../packages/kit-styled/package.json';
import { CloseIcon } from '../icons/CloseIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';
import { Logo } from '../icons/logo';

import { useTheme } from 'qwik-themes';
import MakeItYours from '../make-it-yours/make-it-yours';

export interface HeaderProps {
  showVersion?: boolean;
  showBottomBorder?: boolean;
}

export default component$(({ showVersion = false }: HeaderProps) => {
  const rootStore = useAppState();
  const selectedKitSig = useSelectedKit();
  const location = useLocation();

  const isRouteActive = (href: string) => {
    const isLinkActive = location.url.pathname.startsWith(href);
    return `
        transition-color ease-step duration-300 ${isLinkActive ? 'font-bold' : ''}`;
  };

  const isDocsActive = (baseHref: string) => {
    const isLinkActive = location.url.pathname.startsWith(baseHref);
    return `
        transition-color ease-step duration-300 ${isLinkActive ? 'font-bold' : ''}`;
  };

  const kitSignal = useComputed$(() => {
    if (selectedKitSig.value === KitName.HEADLESS) {
      return {
        name: 'Headless',
        version: headlessVersion,
      };
    }
    if (selectedKitSig.value === KitName.STYLED) {
      return {
        name: 'Styled',
        version: styledKitVersion,
      };
    }
  });

  const { theme, setTheme } = useTheme();

  return (
    <header
      class={[
        `bg-background xs:gap-8 sticky top-0 z-20 flex h-20 w-full items-center gap-6 border-b p-4 md:h-20`,
        rootStore.isSidebarOpened ? '' : 'bg-[var(--color-bg)]',
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
              <span>
                {' '}
                <span>v{kitSignal.value?.version}</span>{' '}
              </span>
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
        {rootStore.featureFlags?.showStyled && (
          <a class={isDocsActive('/docs/styled/')} href="/docs/styled/introduction">
            Styled Kit
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
      <MakeItYours />
      <button
        type="button"
        aria-label="Toggle dark mode"
        onClick$={() => {
          theme?.includes('light') ? setTheme('dark simple') : setTheme('light simple');
        }}
      >
        <div class="hidden dark:block">
          <MoonIcon />
        </div>
        <div class="block dark:hidden">
          <SunIcon />
        </div>
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
});
