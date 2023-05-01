import {
  component$,
  Slot,
  useStyles$,
  $,
  useContext,
  useSignal,
} from '@builder.io/qwik';
import { GitHubIcon } from '../components/icons/GitHubIcon';
import {
  DocsNavigation,
  LinkGroup,
  LinkProps,
} from '../components/navigation-docs/navigation-docs';
import prismStyles from './prism.css?inline';
import docsStyles from './docs.css?inline';
import { ContentMenu, useContent, useLocation } from '@builder.io/qwik-city';
import {
  componentsStatuses,
  ComponentsStatusesMap,
} from '../_state/component-statuses';
import { APP_STATE_CONTEXT_ID } from '../_state/app-state-context-id';
import { MoonIcon } from '../components/icons/MoonIcon';
import { SunIcon } from '../components/icons/SunIcon';
import { CloseIcon } from '../components/icons/CloseIcon';
import { MenuIcon } from '../components/icons/MenuIcon';

export default component$(() => {
  useStyles$(prismStyles);
  useStyles$(docsStyles);

  const { menu } = useContent();

  const { menuItemsGroups } = useKitMenuItems();

  const appState = useContext(APP_STATE_CONTEXT_ID);
  const toggleDarkMode = $(() => {
    appState.mode = appState.mode === 'light' ? 'dark' : 'light';
  });

  // const DecoratedLinkProps = decorateLinksWithBadges(menu?.items || []);
  const menuOpenSignal = useSignal(false);
  const toggleMenu$ = $(() => {
    menuOpenSignal.value = !menuOpenSignal.value;
  });

  return (
    <>
      <header class="fixed top-0 w-full h-20 z-20 border-b-[1px] border-slate-300 dark:border-slate-600 bg-[var(--color-bg)] flex gap-4 sm:gap-8 p-4 items-center">
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick$={toggleMenu$}
          class="block lg:hidden"
        >
          {menuOpenSignal.value ? <CloseIcon /> : <MenuIcon />}
        </button>
        <a href="/" class="lg:ml-8">
          <img src="/qwik-ui.png" class="w-32" />
        </a>
        <div data-tip="Qwik-UI Version" class="mr-auto">
          v.0.0.0
        </div>
        <nav class="hidden sm:flex gap-4">
          <a href="/docs">Docs</a>
          <a href="/contact">Contact</a>
        </nav>
        <button
          type="button"
          aria-label="Toggle dark mode"
          onClick$={toggleDarkMode}
        >
          {appState.mode === 'dark' ? <MoonIcon /> : <SunIcon />}
        </button>
        <a
          target="_blank"
          href="https://github.com/qwikifiers/qwik-ui"
          aria-label="Qwik-UI GitHub repository"
          class="sm:mr-8"
        >
          <GitHubIcon />
        </a>
      </header>
      <div class="flex mt-20">
        {menuOpenSignal.value && (
          <DocsNavigation linksGroups={menuItemsGroups} />
        )}
        <main class="docs">
          <Slot />
        </main>
      </div>
      <footer></footer>
    </>
  );
});

function useKitMenuItems() {
  const { url } = useLocation();
  const { menu } = useContent();
  let menuItemsGroups: LinkGroup[] | undefined = [];

  if (url.pathname.indexOf('headless') !== -1) {
    menuItemsGroups = decorateMenuItemsWithBadges(
      menu?.items,
      componentsStatuses.headless
    );
  }

  if (url.pathname.indexOf('tailwind') !== -1) {
    menuItemsGroups = decorateMenuItemsWithBadges(
      menu?.items,
      componentsStatuses.tailwind
    );
  }

  return {
    menuItemsGroups,
  };
}

function decorateMenuItemsWithBadges(
  menuItems: ContentMenu[] | undefined,
  kitStatusesMap: ComponentsStatusesMap
): LinkGroup[] | undefined {
  return menuItems?.map((item) => {
    return {
      name: item.text,
      children: item.items?.map((child) => {
        const link: LinkProps = {
          name: child.text,
          href: child.href,
        };
        if (kitStatusesMap[link.name]) {
          link.status = kitStatusesMap[link.name];
        }
        return link;
      }),
    };
  });
}
