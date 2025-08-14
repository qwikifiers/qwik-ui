import { getJestProjectsAsync } from '@nx/jest';

export default {
  projects: await getJestProjectsAsync(),
};
