import { $, component$, PropFunction, useContext } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import { APP_STATE } from '../../constants';
import { CloseIcon } from '../icons/CloseIcon';

type Props = {
  onClose$?: PropFunction<() => void>;
};

export const Menu = component$<Props>(({ onClose$ }) => {
  const appState = useContext(APP_STATE);

  const menu = [
    {
      label: 'Accordion',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/accordion`,
    },
    {
      label: 'Alert',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/alert`,
    },
    {
      label: 'Badge',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/badge`,
    },
    {
      label: 'Breadcrumb',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/breadcrumb`,
    },
    {
      label: 'Button',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/button`,
    },
    {
      label: 'ButtonGroup',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/button-group`,
    },
    { label: 'Card', path: `/docs/${appState.theme.toLocaleLowerCase()}/card` },
    {
      label: 'Collapse',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/collapse`,
    },
    {
      label: 'Navigation Bar',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/navigation-bar`,
    },
    {
      label: 'Drawer',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/drawer`,
    },
    { label: 'Input Phone', path: `/docs/headless/input-phone` },
    {
      label: 'Rating',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/rating`,
    },
    {
      label: 'Radio',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/radio`,
    },
    {
      label: 'Popover',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/popover`,
    },
    {
      label: 'Select',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/select`,
    },
    {
      label: 'Spinner',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/spinner`,
    },
    { label: 'Tabs', path: `/docs/${appState.theme.toLocaleLowerCase()}/tabs` },
    {
      label: 'Toast',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/toast`,
    },
    {
      label: 'Toggle',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/toggle`,
    },
    {
      label: 'Tooltip',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/tooltip`,
    },
    {
      label: 'Slider',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/slider`,
    },
    {
      label: 'Pagination',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/pagination`,
    },
    {
      label: 'Checkbox',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/checkbox`,
    },
    {
      label: 'Progress',
      path: `/docs/${appState.theme.toLocaleLowerCase()}/progress`,
    },
  ];

  const onChangePage = $(() => {
    if (onClose$) {
      onClose$();
    }
  });

  return (
    <div class="px-4 py-4">
      <div class="flex items-center justify-between">
        <h4 class="text-2xl">Documentation</h4>
        {onClose$ && (
          // eslint-disable-next-line qwik/valid-lexical-scope
          <h5 onClick$={onClose$}>
            <CloseIcon />
          </h5>
        )}
      </div>
      <div class="mt-4">
        <div class="mt-8 flex items-center">
          <p class="capitalize text-xl">guide</p>
        </div>
        <ul class="py-2 px-4">
          <li>
            <Link href="/install" class="text-lg">
              <span onClick$={onChangePage}>Install</span>
            </Link>
          </li>
          <li>
            <Link href="/use" class="text-lg">
              <span onClick$={onChangePage}>Use</span>
            </Link>
          </li>
        </ul>
        <div class="mt-8 flex items-center">
          <p class="capitalize text-xl">components</p>
        </div>
        <ul class="py-2 px-4">
          {menu
            .sort((a, b) => (a.label > b.label ? 1 : -1))
            .map((menuItem, index) => (
              <li key={index}>
                <Link href={menuItem.path}>
                  <span class="text-lg" onClick$={onChangePage}>
                    {menuItem.label}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
});
