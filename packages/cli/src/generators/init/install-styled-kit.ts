import { getPackageManagerCommand } from '@nx/devkit';
import { execSync } from 'child_process';

export function installStyledKit(styledPackage: string) {
  execSync(`${getPackageManagerCommand().add} ${styledPackage}@latest`, {
    stdio: [0, 1, 2],
  });
}
