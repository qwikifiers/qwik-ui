import { danger, fail, warn } from 'danger';

const warnBigPR = () => {
  const changesPRThreshold = 300;
  const filesPRThreshold = 30;
  const newFiles = danger.github.pr.changed_files;
  const changes = danger.github.pr.additions + danger.github.pr.deletions;
  if (changes > changesPRThreshold || newFiles > filesPRThreshold) {
    warn(
      `:exclamation: Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR for faster, easier review.`
    );
  }
};

const blockMismatches = () => {
  const hasPackageChanges = danger.git.modified_files.includes('package.json');
  const hasLockfileChanges =
    danger.git.modified_files.includes('pnpm-lock.yaml');
  if (hasPackageChanges && !hasLockfileChanges) {
    fail(
      'There are package.json changes with no corresponding lockfile changes'
    );
  }
};

warnBigPR();
blockMismatches();
