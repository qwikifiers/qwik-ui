import { useContext } from '@builder.io/qwik';
import { ROOT_STORE_CONTEXT_ID } from './root-store-context-id';

export const useRootStore = () => {
  const rootStore = useContext(ROOT_STORE_CONTEXT_ID);

  return rootStore;
};
