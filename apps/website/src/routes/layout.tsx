import { component$, Slot, useStyles$ } from '@builder.io/qwik';
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
import Header from '../components/header/header';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

export default component$(() => {
  useStyles$(prismStyles);
  useStyles$(docsStyles);

  const { menuItemsGroups } = useKitMenuItems();

  return (
    <>
      <Header showBottomBorder={true} showVersion={true} />

      <div class="flex mt-20">
        <DocsNavigation linksGroups={menuItemsGroups} />
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
