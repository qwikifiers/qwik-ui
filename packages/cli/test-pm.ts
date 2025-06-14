import { resolveCommand } from 'package-manager-detector';
import { detect } from 'package-manager-detector/detect';

export async function getPackageManager() {
  const pm = await detect();
  return pm;
}

export async function getPmExecuteCommand() {
  const pm = await getPackageManager();
  const { command, args } = resolveCommand(pm.agent, 'execute', []);
  return `${command} ${args.join(' ')}`;
}

async function main() {
  const cmd = await getPmExecuteCommand();
  console.log(cmd);
}

main();
