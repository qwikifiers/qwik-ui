import { dirname } from 'path';
import { COMPONENTS_REGISTRY_FILENAME } from './config-filenames';

export enum StyledKit {
  FLUFFY = 'fluffy',
  MINIMAL = 'minimal',
}

export const styledPackagesMap = {
  [StyledKit.FLUFFY]: '@qwik-ui/fluffy',
  [StyledKit.MINIMAL]: '@qwik-ui/minimal',
};

export function getKitRoot(styledKit: StyledKit) {
  const styledPackageName = styledPackagesMap[styledKit];
  const kitRoot = dirname(
    require.resolve(`${styledPackageName}/${COMPONENTS_REGISTRY_FILENAME}`),
  );
  return kitRoot;
}
