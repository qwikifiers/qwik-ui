#!/usr/bin/env node

/*
STEPS

1. Check for the "init" command

  1. Check if nx is present (package.json? nx.json?)

  2. If it isn't present, run nx@latest init

  3. IF it is present (or after installation), run the rest of the init command

  4. Ask questions about component locations etc (css vars?)

  5. create the necessary files

2. Check for the "add" command

  2.1 run the correct generator

*/

import { cancel, confirm, intro, log, outro, spinner } from '@clack/prompts';
import { execSync } from 'child_process';
import { green, red } from 'kleur/colors';

async function main() {
  const command = process.argv[2]; // TODO: use libraries like yargs or enquirer to set your workspace name
  if (!command) {
    log.error(
      `A command is missing, please choose one of the following commands: ${green(
        'init',
      )}`,
    );
    cancel();
    process.exit(1);
  }

  intro('🐨 Fluffy');

  if (command === 'init') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nxVersion = require('../package.json').dependencies['@nx/devkit'];

    log.info(`Version: ${nxVersion}`);

    // TODO: CHECK IF NX.JSON EXISTS

    const haveNxInstalled = await confirm({
      message: 'Do you already have Nx installed? (required)',
      initialValue: false,
    });

    if (!haveNxInstalled) {
      const initSpinner = spinner();
      initSpinner.start('Installing Nx...');
      execSync(`npx --yes nx@${nxVersion} init --interactive false`, {
        stdio: [0, 1, 2],
      });
      initSpinner.stop('Installed Nx!');
    }

    /*
      
      1. Collect options from user
      2. Run execSync on nx generate init
    */

    log.success('nx init done');
  } else if (command === 'add') {
    /*
      Collect options from user (which components to generate)
      run the generator with the options as arguments 
      (in the generator, have a map of dependencies per component type to install)
    */
  } else {
    log.error(
      `Invalid command: ${red(command)}
Please choose one of the following commands: ${green('init')}`,
    );
    cancel();
    process.exit(1);
  }

  outro('Successfully initialized fluffy');
}

main();
