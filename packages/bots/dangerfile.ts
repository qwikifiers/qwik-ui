import { danger, fail } from 'danger';

const hasPackageChanges = danger.git.modified_files.includes('package.json');
const hasLockfileChanges = danger.git.modified_files.includes('pnpm-lock.yaml');
if (hasPackageChanges && !hasLockfileChanges) {
  fail('There are package.json changes with no corresponding lockfile changes');
}
