import { useComputed$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { KitName } from '~/_state/kit-name.type';

export const useSelectedKit = () => {
  const { url } = useLocation();

  return useComputed$(() => {
    if (url.pathname.indexOf('headless') !== -1) {
      return KitName.HEADLESS;
    }

    if (url.pathname.indexOf('styled') !== -1) {
      return KitName.STYLED;
    }

    return KitName.NO_KIT;
  });
};
