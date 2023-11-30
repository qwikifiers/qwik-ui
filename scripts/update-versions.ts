import { readFile as fsReadFile, writeFile as fsWriteFile } from 'node:fs';

import { join } from 'node:path';
import { promisify } from 'util';

export const readFile = /*#__PURE__*/ promisify(fsReadFile);
export const writeFile = /*#__PURE__*/ promisify(fsWriteFile);

export async function readPackageJson(pkgJsonDir: string) {
  const pkgJsonPath = join(pkgJsonDir, 'package.json');
  const pkgJson = JSON.parse(await readFile(pkgJsonPath, 'utf-8'));
  return pkgJson;
}

export async function writePackageJson(pkgJsonDir: string, pkgJson: any) {
  const pkgJsonPath = join(pkgJsonDir, 'package.json');
  const pkgJsonStr = JSON.stringify(pkgJson, null, 2) + '\n';
  await writeFile(pkgJsonPath, pkgJsonStr);
}

async function updateUtilsVersion() {
  const distPackagesDir = join('dist', 'packages');
  const utilsPkgJson = await readPackageJson(join(distPackagesDir, 'utils'));
  const kitHeadlessPkgJson = await readPackageJson(join(distPackagesDir, 'kit-headless'));

  const version = utilsPkgJson.version;

  kitHeadlessPkgJson.dependencies['@qwik-ui/utils'] = version;

  await writePackageJson(join(distPackagesDir, 'kit-headless'), kitHeadlessPkgJson);

  console.log(`Updated @qwik-ui/kit-headless to @qwik-ui/utils@${version}`);
}

await updateUtilsVersion();
