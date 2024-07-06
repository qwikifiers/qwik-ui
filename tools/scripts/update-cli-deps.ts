import { readFile as fsReadFile, writeFile as fsWriteFile } from 'node:fs';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

export const readFile = /*#__PURE__*/ promisify(fsReadFile);
export const writeFile = /*#__PURE__*/ promisify(fsWriteFile);

export async function readJson(path: string) {
  return JSON.parse(await readFile(path, 'utf-8'));
}

export async function writeJson(path: string, content: any) {
  const contentStr = JSON.stringify(content, null, 2) + '\n';
  await writeFile(path, contentStr);
}

async function updateCLIDepsVersions() {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const cliJsonPath = join(
    currentDir,
    '../',
    '../',
    'packages',
    'cli',
    'src',
    '_shared',
    'external-deps.json',
  );
  const cliExternalDeps = await readJson(cliJsonPath);

  const rootPkgJson = await readJson(join(currentDir, '../', '../', 'package.json'));

  if (!cliExternalDeps) {
    throw new Error('No content for external-deps.json');
  }
  Object.keys(cliExternalDeps).forEach((dep) => {
    if (rootPkgJson.devDependencies[dep]) {
      cliExternalDeps[dep] = rootPkgJson.devDependencies[dep];
    }
  });

  await writeJson(cliJsonPath, cliExternalDeps);

  console.log(
    `👉 Updated CLI external dependencies versions to ${JSON.stringify(cliExternalDeps)}`,
  );
}

await updateCLIDepsVersions();
