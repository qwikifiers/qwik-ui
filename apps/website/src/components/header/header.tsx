import { $, component$, useComputed$, useSignal, useStyles$ } from '@builder.io/qwik';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version as headlessVersion } from '../../../../../packages/kit-headless/package.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useLocation } from '@builder.io/qwik-city';
// eslint-disable-next-line @nx/enforce-module-boundaries
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version as styledKitVersion } from '../../../../../packages/kit-styled/package.json';
import { CloseIcon } from '../icons/CloseIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';
import { LogoWithBorders } from '../icons/logo';

import { useTheme } from 'qwik-themes';
import MakeItYours from '../make-it-yours/make-it-yours';
import { Modal, ModalContent, ModalHeader } from '@qwik-ui/headless';
import { useAppState } from '~/_state/use-app-state';
import { LuX } from '@qwikest/icons/lucide';
import { DocsNavigation } from '../navigation-docs/navigation-docs';
import { useKitMenuItems } from '~/routes/layout';
import { cn } from '@qwik-ui/utils';
import { DiscordIcon } from '../icons/discord';

export interface HeaderProps {
  showVersion?: boolean;
  showBottomBorder?: boolean;
}

export default component$(({ showVersion = false }: HeaderProps) => {
  useStyles$(`
    .sidebar-mobile::backdrop {
      background: rgba(0,0,0,0.2);
    }
  
    .sidebar-mobile {
      animation: sidebarOpen 0.75s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .sidebar-mobile::backdrop {
      animation: sidebarFadeIn 0.75s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .sidebar-mobile.modal-closing {
      animation: sidebarClose 0.35s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .sidebar-mobile.modal-closing::backdrop {
      animation: sidebarFadeOut 0.35s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }

    @keyframes sidebarOpen {
      from {
        opacity: 0;
        transform: translateX(-100%);
      }
      to {
        opacity: 1;
        transform: translateX(0%);
      }
    }
  
    @keyframes sidebarClose {
      from {
        opacity: 1;
        transform: translateX(0%);
      }
      to {
        opacity: 0;
        transform: translateX(-100%);
      }
    }
  
    @keyframes sidebarFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  
    @keyframes sidebarFadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    `);

  const { menuItemsGroups } = useKitMenuItems();

  const rootStore = useAppState();
  const isSidebarOpenedSig = useSignal(false);
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
    if (location.url.pathname.startsWith('/docs/headless')) {
      return {
        name: 'Headless',
        version: headlessVersion,
      };
    }
    if (location.url.pathname.startsWith('/docs/styled')) {
      return {
        name: 'Styled',
        version: styledKitVersion,
      };
    }
  });

  const { theme, setTheme } = useTheme();

  const switchLightDark = $((input: string | string[]): string | string[] | undefined => {
    const switchWord = (word: string): string =>
      word.includes('light')
        ? word.replace('light', 'dark')
        : word.replace('dark', 'light');
    if (typeof input === 'string') {
      return switchWord(input);
    } else if (Array.isArray(input)) {
      return input.map((item) => switchWord(item));
    }
  });

  return (
    <>
      <div
        class={cn(
          'bg-background sticky top-0 z-10 flex h-16 justify-center border-b',
          theme?.includes('brutalist') && 'border-b-2',
        )}
      >
        <header class="flex w-full max-w-screen-2xl items-center justify-between">
          <div class="block md:hidden" />
          <section class=" hidden md:flex md:items-center">
            <a href="/" aria-label="Qwik UI Logo" class="ml-8">
              <LogoWithBorders />
            </a>
            {showVersion && (
              <div class="ml-4 hidden text-xs lg:flex">
                {kitSignal.value?.name + ' ' + kitSignal.value?.version}
              </div>
            )}
          </section>

          <div class={cn('xs:space-x-8 mr-4 flex items-center space-x-4')}>
            <a
              class={cn(
                isDocsActive('/docs/headless/'),
                location.url.pathname.startsWith('/docs/headless') && 'hidden sm:block',
                !location.url.pathname.startsWith('/docs/headless') &&
                  !location.url.pathname.startsWith('/docs/styled') &&
                  'hidden md:block',
              )}
              href="/docs/headless/introduction"
            >
              Headless kit
            </a>

            {rootStore.featureFlags?.showStyled && (
              <a
                class={cn(
                  isDocsActive('/docs/styled/'),
                  location.url.pathname.startsWith('/docs/styled') && 'hidden sm:block',
                  !location.url.pathname.startsWith('/docs/headless') &&
                    !location.url.pathname.startsWith('/docs/styled') &&
                    'hidden md:block',
                )}
                href="/docs/styled/introduction"
              >
                Styled kit
              </a>
            )}
            <MakeItYours />
            <a
              class={isRouteActive('https://discord.gg/PVWUUejrez')}
              href="https://discord.gg/PVWUUejrez"
              target="_blank"
            >
              <DiscordIcon />
            </a>
            <a
              target="_blank"
              href="https://github.com/qwikifiers/qwik-ui"
              aria-label="Qwik-UI GitHub repository"
            >
              <GitHubIcon />
            </a>
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick$={async () => setTheme(await switchLightDark(theme || 'light'))}
            >
              <div class="hidden dark:block">
                <MoonIcon />
              </div>
              <div class="block dark:hidden">
                <SunIcon />
              </div>
            </button>

            <button
              type="button"
              aria-label="Toggle navigation"
              onClick$={() => {
                isSidebarOpenedSig.value = !isSidebarOpenedSig.value;
              }}
              class="mr-4 block lg:hidden"
            >
              {isSidebarOpenedSig.value ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </header>
      </div>
      <Modal
        bind:show={isSidebarOpenedSig}
        class="sidebar-mobile bg-background text-foreground rounded-base ml-0 mr-auto h-screen min-w-80 max-w-lg border-0 p-8 shadow-md"
      >
        <ModalHeader>
          <h2 class="text-lg font-bold">
            {(() => {
              const { pathname } = location.url;
              if (pathname.startsWith('/docs/headless')) {
                return 'Headless kit';
              }
              if (pathname.startsWith('/docs/styled')) {
                return 'Styled kit';
              }
              return 'Qwik UI';
            })()}
          </h2>
        </ModalHeader>
        <ModalContent class="mb-2 pb-4 pt-2">
          <DocsNavigation
            linksGroups={menuItemsGroups}
            class="bg-background max-w-80 overflow-auto"
          />
        </ModalContent>
        <button
          onClick$={() => (isSidebarOpenedSig.value = false)}
          class="absolute right-6 top-[26px]"
        >
          <LuX class="h-8 w-8" />
        </button>
      </Modal>
    </>
  );
});
