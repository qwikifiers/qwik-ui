import { readJsonFile, writeJsonFile } from '@nx/devkit';

const FLUFFY_JSON = 'fluffy.json';

export async function init() {
  if (await readJsonFile(FLUFFY_JSON)) {
    console.log(`${FLUFFY_JSON} already exists`);
    return;
  }

  await writeJsonFile(FLUFFY_JSON, {
    componentsRoot: 'src/ui',
  });
}
