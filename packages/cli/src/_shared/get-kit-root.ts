import { dirname } from 'path';
import { COMPONENTS_REGISTRY_FILENAME } from './config-filenames';

export function getKitRoot() {
  const kitRoot = dirname(
    require.resolve(`@qwik-ui/styled/${COMPONENTS_REGISTRY_FILENAME}`),
  );
  return kitRoot;
}
