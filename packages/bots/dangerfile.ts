import { danger, fail, warn } from 'danger';
import includes from 'lodash.includes';

const hasPackageChanges = includes(danger.git.modified_files, 'package.json');
const hasLockfileChanges = includes(
  danger.git.modified_files,
  'pnpm-lock.yaml'
);
if (hasPackageChanges && !hasLockfileChanges) {
  warn('There are package.json changes with no corresponding lockfile changes');
}
