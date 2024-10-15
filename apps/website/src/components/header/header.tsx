import {
  $,
  PropsOf,
  component$,
  useComputed$,
  useSignal,
  useStyles$,
} from '@builder.io/qwik';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version as headlessVersion } from '../../../../../packages/kit-headless/package.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useLocation } from '@builder.io/qwik-city';
// eslint-disable-next-line @nx/enforce-module-boundaries
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version as styledKitVersion } from '../../../../../packages/kit-styled/package.json';
import { GitHubIcon } from '../icons/GitHubIcon';
import { LogoIcon, LogoWithBorders } from '../icons/logo';

import { useTheme } from '@qwik-ui/themes';

import { Modal } from '@qwik-ui/headless';
import { useAppState } from '~/_state/use-app-state';
import { LuMenu, LuMoon, LuSun, LuX } from '@qwikest/icons/lucide';
import { DocsNavigation } from '../navigation-docs/navigation-docs';
import { useKitMenuItems } from '~/routes/layout';
import { cn } from '@qwik-ui/utils';
import { DiscordIcon } from '../icons/discord';
import { Button, buttonVariants } from '@qwik-ui/styled';
import MakeItYours from '../make-it-yours/make-it-yours';

export interface HeaderProps {
  showVersion?: boolean;
  showBottomBorder?: boolean;
}

export default component$(({ showVersion = false }: HeaderProps) => {
  useStyles$(`
    .sidebar-mobile::backdrop {
      background: rgba(0,0,0,0.5);
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
        transform: translateX(100%);
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
        transform: translateX(100%);
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

  const { themeSig } = useTheme();

  return (
    <Modal.Root
      class={cn(
        'sticky top-0 z-10 flex h-16 justify-center border-b bg-background',
        themeSig.value?.includes('brutalist') && 'border-b-2',
      )}
      bind:show={isSidebarOpenedSig}
    >
      <header class="flex w-full max-w-screen-2xl items-center justify-between">
        <section class="flex items-center justify-start">
          <a href="/" aria-label="Qwik UI Logo" class="ml-4">
            <LogoWithBorders class="hidden sm:block" />
            <LogoIcon class="block sm:hidden" />
          </a>
          {showVersion && (
            <div class="ml-4 hidden text-xs md:flex">
              {kitSignal.value?.name &&
                kitSignal.value?.name + ' ' + kitSignal.value?.version}
            </div>
          )}
        </section>

        <div class="mr-4 flex items-center">
          <div class="mr-6 hidden items-center space-x-8 text-sm lg:flex">
            <a
              class={isDocsActive('/docs/headless/')}
              href="/docs/headless/introduction/"
            >
              Headless
            </a>
            {rootStore.featureFlags?.showStyled && (
              <a class={isDocsActive('/docs/styled/')} href="/docs/styled/introduction/">
                Styled
              </a>
            )}
          </div>
          <div class="flex items-center space-x-1 xs:space-x-4">
            <MakeItYours />
            <a
              href="https://discord.gg/PVWUUejrez"
              target="_blank"
              class={cn(buttonVariants({ size: 'icon', look: 'ghost' }))}
            >
              <DiscordIcon />
            </a>
            <a
              target="_blank"
              href="https://github.com/qwikifiers/qwik-ui"
              aria-label="Qwik-UI GitHub repository"
              class={cn(buttonVariants({ size: 'icon', look: 'ghost' }))}
            >
              <GitHubIcon />
            </a>
            <DarkModeToggle />
            <Button
              type="button"
              aria-label="Toggle navigation"
              onClick$={() => {
                isSidebarOpenedSig.value = !isSidebarOpenedSig.value;
              }}
              size="icon"
              look="ghost"
              class="flex lg:hidden"
            >
              <LuMenu class="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
      <Modal.Panel class="sidebar-mobile ml-auto mr-0 h-screen w-full min-w-80 max-w-sm rounded-base border-0 bg-background p-8 text-foreground shadow-md">
        <div class="mb-2 pb-4 pt-2">
          <DocsNavigation
            linksGroups={
              menuItemsGroups && menuItemsGroups.length > 0 ? menuItemsGroups : undefined
            }
            class="max-w-80 overflow-auto bg-background"
          />
        </div>
        <button
          autoFocus
          onClick$={() => (isSidebarOpenedSig.value = false)}
          class="absolute right-6 top-[26px]"
        >
          <LuX class="h-8 w-8" />
        </button>
      </Modal.Panel>
    </Modal.Root>
  );
});

const DarkModeToggle = component$<PropsOf<typeof Button>>(({ ...props }) => {
  const { themeSig } = useTheme();
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
    <Button
      {...props}
      aria-label="Toggle dark mode"
      size="icon"
      look="ghost"
      onClick$={async () =>
        (themeSig.value = await switchLightDark(themeSig.value || 'light'))
      }
    >
      <div class="hidden dark:block">
        <LuMoon class="h-6 w-6" />
      </div>
      <div class="block dark:hidden">
        <LuSun class="h-6 w-6" />
      </div>
    </Button>
  );
});
