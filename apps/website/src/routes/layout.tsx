import { Slot, component$, useStyles$ } from '@builder.io/qwik';
import { ContentMenu, useContent } from '@builder.io/qwik-city';
import { QwikUIProvider } from '@qwik-ui/headless';
import { ComponentsStatusesMap, statusByComponent } from '../_state/component-statuses';
import { KitName } from '../_state/kit-name.type';
import { useRootStore } from '../_state/use-root-store';
import Header from './_components/header/header';
import docsStyles from './docs.css?inline';
import {
  DocsNavigation,
  LinkGroup,
  LinkProps,
} from './docs/_components/navigation-docs/navigation-docs';
import { useSelectedKit } from './docs/use-selected-kit';
import prismStyles from './prism.css?inline';

export default component$(() => {
  useStyles$(prismStyles);
  useStyles$(docsStyles);

  const { menuItemsGroups } = useKitMenuItems();
  const rootStore = useRootStore();

  return (
    <>
      <Header showBottomBorder={true} showVersion={true} />
      <QwikUIProvider>
        <div class="flex mt-20">
          <DocsNavigation linksGroups={menuItemsGroups} />
          <main class="docs">
            <Slot />
          </main>
        </div>
      </QwikUIProvider>
      <footer></footer>
    </>
  );
});

function useKitMenuItems() {
  const selectedKitSig = useSelectedKit();
  const { menu } = useContent();
  let menuItemsGroups: LinkGroup[] | undefined = [];

  if (selectedKitSig.value === KitName.HEADLESS) {
    menuItemsGroups = decorateMenuItemsWithBadges(
      menu?.items,
      statusByComponent.headless,
    );
  }

  if (selectedKitSig.value === KitName.TAILWIND) {
    menuItemsGroups = decorateMenuItemsWithBadges(
      menu?.items,
      statusByComponent.tailwind,
    );
  }

  return {
    menuItemsGroups,
  };
}

function decorateMenuItemsWithBadges(
  menuItems: ContentMenu[] | undefined,
  kitStatusesMap: ComponentsStatusesMap,
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
