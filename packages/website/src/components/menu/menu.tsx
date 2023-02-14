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
    { label: 'Button', path: `/docs/${appState.theme.toLowerCase()}/button` },
    {
      label: 'ButtonGroup',
      path: `/docs/${appState.theme.toLowerCase()}/button-group`,
    },
    { label: 'Card', path: `/docs/${appState.theme.toLowerCase()}/card` },
    {
      label: 'Collapse',
      path: `/docs/${appState.theme.toLowerCase()}/collapse`,
    },
    { label: 'Drawer', path: `/docs/${appState.theme.toLowerCase()}/drawer` },
    { label: 'Menu', path: `/docs/${appState.theme.toLowerCase()}/menu` },
    { label: 'Select', path: `/docs/${appState.theme.toLowerCase()}/select` },
    { label: 'Tabs', path: `/docs/${appState.theme.toLowerCase()}/tabs` },
    { label: 'Toogle', path: `/docs/${appState.theme.toLowerCase()}/toogle` },
    { label: 'Tooltip', path: `/docs/${appState.theme.toLowerCase()}/tooltip` },
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
          {menu.map((menuItem) => (
            <li>
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
