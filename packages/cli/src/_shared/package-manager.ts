import { resolveCommand } from 'package-manager-detector';
import { detect } from 'package-manager-detector/detect';

export async function getPackageManager() {
  const pm = await detect();

  function getExecuteCommand() {
    const { command, args } = resolveCommand(pm.agent, 'execute', []);
    return `${command} ${args.join(' ')}`;
  }

  function getAddDependencyCommand() {
    const { command, args } = resolveCommand(pm.agent, 'add', []);
    return `${command} ${args.join(' ')}`;
  }

  function getAddDevDependencyCommand() {
    const addDependencyCommand = getAddDependencyCommand();
    return `${addDependencyCommand} -D`;
  }

  return {
    getExecuteCommand,
    getAddDependencyCommand,
    getAddDevDependencyCommand,
  };
}
