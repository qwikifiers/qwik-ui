#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-empty-function */

import {
  cancel,
  confirm,
  intro,
  isCancel,
  log,
  multiselect,
  outro,
  select,
  text,
} from '@clack/prompts';
import {
  getPackageManagerCommand,
  readJsonFile,
  workspaceRoot,
  writeJsonFile,
} from '@nx/devkit';

import { Color, ThemeStyle, type BorderRadius, type ThemeConfig } from '@qwik-ui/utils';
import { bgRgb, bold, cyan, green, red } from 'ansis';
import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import yargs, { type CommandModule } from 'yargs';
import {
  COMPONENTS_REGISTRY_FILENAME,
  QWIK_UI_CONFIG_FILENAME,
} from '../src/_shared/config-filenames';

const COMMANDS = ['init', 'add'];
const listOfCommands = COMMANDS.join(', ');
const styledPackage = '@qwik-ui/styled';

main();

async function main() {
  console.clear();

  const command = process.argv[2];

  if (!command) {
    exitWithError(
      `A command is missing, please choose one of the following commands: ${green(
        listOfCommands,
      )}`,
    );
  }

  intro('🐨 Qwik UI');

  if (command === 'init') {
    await handleInit();
    log.success('Successfully initialized Qwik UI! 🎉');
  } else if (command === 'add') {
    await handleAdd();
  } else {
    exitWithError(
      `Invalid command: ${red(command)}
Please choose one of the following commands: ${green(listOfCommands)}`,
    );
  }
  outro('Done! 💪');
}

async function handleInit() {
  const InitCommand: CommandModule = {
    command: 'init',
    describe: 'Initialize Qwik UI',
    builder: (yargs) =>
      yargs
        .option('projectRoot', {
          description: 'The root of the project (default: "/")',
          type: 'string',
        })
        .option('uiComponentsPath', {
          description: 'Generated components folder',
          type: 'string',
        })
        .option('rootCssPath', {
          description:
            'Global css file location (where you defined your tailwind directives)',
          type: 'string',
        })
        .option('installTailwind', {
          description: 'Skip tailwind confirmation',
          type: 'boolean',
          default: false,
          hidden: true,
        })
        .option('style', {
          description: 'Theme style',
          type: 'string',
          choices: [ThemeStyle.SIMPLE, ThemeStyle.BRUTALIST, ThemeStyle.NEUMORPHIC],
        })
        .option('e2e', {
          description: 'Install styled packages tagged as e2e for tests',
          type: 'boolean',
          default: false,
          hidden: true,
        })
        .option('components', {
          description: 'components to auto install',
          type: 'string',
          hidden: true,
        }),

    handler: () => {},
  };

  const args = await parseCommands(InitCommand);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  await installNxIfNeeded();

  interface InitConfig extends ThemeConfig {
    projectRoot?: string;
    uiComponentsPath?: string;
    rootCssPath?: string;
  }

  const config: InitConfig = {
    projectRoot: args['projectRoot'] as string,
    uiComponentsPath: args['uiComponentsPath'] as string,
    rootCssPath: args['rootCssPath'] as string,
    style: args['style'] as ThemeStyle,
    primaryColor: args['primaryColor'] as string,
    borderRadius: args['borderRadius'] as BorderRadius,
  };

  if (!config.projectRoot) {
    config.projectRoot = cancelable(
      await text({
        message: 'Specify the root of the project (leave empty for "/")',
        initialValue: '/',
      }),
    );
  }

  if (!config.uiComponentsPath) {
    config.uiComponentsPath = cancelable(
      await text({
        message: cyan('UI components folder'),
        initialValue: 'src/components/ui',
      }),
    );
  }

  if (!config.rootCssPath) {
    config.rootCssPath = await collectFileLocationFromUser({
      message: cyan(
        'Your global css file location (where you defined your tailwind directives)',
      ),
      errorMessageName: 'Global css file',
      initialValue: 'src/global.css',
    });
  }

  // INSTALL TAILWIND IF NEEDED
  let installTailwind = args['installTailwind'] as boolean;

  if (!installTailwind) {
    installTailwind = cancelable(
      await confirm({
        message: cyan('Would you like to instal Tailwind? (required)'),
        initialValue: false,
      }),
    );
  }

  // TODO: Add "cwd" with the project root, and see if we can skip the interactive question from qwik cli
  if (installTailwind) {
    execSync(
      `${getPackageManagerCommand().exec} qwik add tailwind --skipConfirmation=true`,
      {
        stdio: 'inherit',
      },
    );
  }

  // ADD QWIK UI CLI TO DEPENDENCIES
  log.info('Adding qwik-ui cli to package.json...');
  execSync(`${getPackageManagerCommand().addDev} qwik-ui@latest`, {
    stdio: 'inherit',
  });

  // CREATE CONFIG FILE
  execSync(
    `${
      getPackageManagerCommand().exec
    } nx g qwik-ui:init --interactive false --project-root=${
      config.projectRoot
    } --ui-components-path=${config.uiComponentsPath}`,
    {
      stdio: 'inherit',
    },
  );

  let shouldCustomize = false;
  if (!config.style && !config.primaryColor && !config.borderRadius) {
    shouldCustomize = cancelable(
      await confirm({
        message: cyan('Would you like to customize the theme?'),
        initialValue: false,
      }),
    );
  }

  if (!shouldCustomize) {
    config.style ||= ThemeStyle.SIMPLE;
    config.primaryColor ||= Color.CYAN + '-600';
    config.borderRadius ||= 'border-radius-0';
  } else {
    if (!config.style) {
      config.style = cancelable(
        await select({
          message: cyan('Choose a style for your theme'),

          options: [
            { label: 'Simple', value: ThemeStyle.SIMPLE },
            { label: 'Brutalist', value: ThemeStyle.BRUTALIST },
            { label: 'Neumorphic', value: ThemeStyle.NEUMORPHIC },
          ],
          initialValue: 'simple',
        }),
      );
    }

    if (!config.primaryColor) {
      config.primaryColor = cancelable(
        await select({
          message: cyan('Choose a primary color'),
          initialValue: Color.CYAN + '-600',
          options: [
            {
              label: bold`${bgRgb(220, 38, 38)`   `} ${capitalizeFirstLetter(
                Color.RED,
              )} `,
              hint: Color.RED + '-600',
              value: Color.RED + '-600',
            }, // 600
            {
              label: bold`${bgRgb(234, 88, 12)`   `} ${capitalizeFirstLetter(
                Color.ORANGE,
              )} `, // 600
              hint: Color.ORANGE + '-600',
              value: Color.ORANGE + '-600',
            },
            {
              label: bold`${bgRgb(250, 204, 21)`   `} ${capitalizeFirstLetter(
                Color.YELLOW,
              )} `, // 400
              hint: Color.YELLOW + '-400',
              value: Color.YELLOW + '-400',
            },
            {
              label: bold`${bgRgb(22, 163, 74)`   `} ${capitalizeFirstLetter(
                Color.GREEN,
              )} `, // 600
              hint: Color.GREEN + '-600',
              value: Color.GREEN + '-600',
            },
            {
              label: bold`${bgRgb(6, 182, 212)`   `} ${capitalizeFirstLetter(
                Color.CYAN,
              )} `, // 600
              hint: Color.CYAN + '-600',
              value: Color.CYAN + '-600',
            },
            {
              label: bold`${bgRgb(37, 99, 235)`   `} ${capitalizeFirstLetter(
                Color.BLUE,
              )} `, // 600
              hint: Color.BLUE + '-600',
              value: Color.BLUE + '-600',
            },
            {
              label: bold`${bgRgb(147, 51, 234)`   `} ${capitalizeFirstLetter(
                Color.PURPLE,
              )} `, // 600
              hint: Color.PURPLE + '-600',
              value: Color.PURPLE + '-600',
            },
            {
              label: bold`${bgRgb(219, 39, 119)`   `} ${capitalizeFirstLetter(
                Color.PINK,
              )} `, // 600
              hint: Color.PINK + '-600',
              value: Color.PINK + '-600',
            },
          ],
        }),
      );
    }

    if (!config.borderRadius) {
      config.borderRadius = cancelable(
        await select({
          message: cyan('Choose a border radius'),

          options: [
            { label: '0', hint: 'No border radius', value: 'border-radius-0' },
            { label: '0.25', value: 'border-radius-dot-25' },
            { label: '0.5', value: 'border-radius-dot-50' },
            { label: '0.75', value: 'border-radius-dot-75' },
            { label: '1', value: 'border-radius-1' },
          ],
          initialValue: 'border-radius-0',
        }),
      );
    }
  }

  // INSTALL STYLED KIT

  const packageTag = args['e2e'] ? 'e2e' : 'latest';

  log.info(`Installing ${styledPackage}...`);
  execSync(`${getPackageManagerCommand().addDev} ${styledPackage}@${packageTag}`, {
    stdio: 'inherit',
  });

  // SETUP TAILWIND
  execSync(
    `${
      getPackageManagerCommand().exec
    } nx g qwik-ui:setup-tailwind --interactive false --project-root=${
      config.projectRoot
    }  --root-css-path=${config.rootCssPath} --style=${config.style}`,
    {
      stdio: 'inherit',
    },
  );

  log.info('Tailwind configured.');
  log.info('If you want to customize your theme further, check out https://qwikui.com');
}

async function installNxIfNeeded() {
  if (existsSync('nx.json')) {
    log.info('seems like nx.json already exists. cool!');
  } else {
    log.info('Installing Nx...');

    execSync(`${getPackageManagerCommand().addDev} nx@latest`, {
      stdio: 'inherit',
    });

    const packageJson = await readJsonFile('package.json');
    packageJson['nx'] = {};
    await writeJsonFile('package.json', packageJson);

    const ignorePath = '.gitignore';
    try {
      let contents = readFileSync(ignorePath, 'utf-8');
      if (!contents.includes('.nx/cache')) {
        contents = [contents, '', '.nx/cache'].join('\n');
        writeFileSync(ignorePath, contents, 'utf-8');
      }
    } catch {
      /* empty */
    }
  }
  log.success('nx init done');
}

async function handleAdd(projectRoot?: string, componentsFromInit?: string) {
  if (!existsSync(QWIK_UI_CONFIG_FILENAME)) {
    exitWithError(
      `${QWIK_UI_CONFIG_FILENAME} not found, please run ${green('qwik-ui init')} first`,
    );
  }
  // const config = await readJsonFile<QwikUIConfig>(QWIK_UI_CONFIG_FILENAME);

  // read config file to collect components and add to description below

  const componentsJsonPath = require.resolve(
    `${styledPackage}/${COMPONENTS_REGISTRY_FILENAME}`,
  );
  const componentsJson = readJsonFile<{
    componentsRoot: string;
    components: {
      displayName: string;
      type: string;
      componentFolder: string;
      files: string[];
    }[];
  }>(componentsJsonPath);

  const possibleComponents = componentsJson.components;
  const possibleComponentNames = componentsJson.components.map((c) => c.displayName);
  const componentsMap = componentsJson.components.reduce((acc, curr) => {
    acc[curr.type] = curr;
    return acc;
  }, {} as Record<string, (typeof componentsJson.components)[0]>);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const AddCommand: CommandModule = {
    command: 'add [components]',

    describe: 'Add components to your project',
    builder: (yargs) =>
      yargs
        .positional('components', {
          description: `Choose which components to add
Options: [${possibleComponentNames.join(', ')}]`,
          type: 'string',
          coerce: (components) => componentTypesFromString(components),
        })
        .option('projectRoot', {
          description: 'The root of the project (default: "/")',
          type: 'string',
          default: '/',
        }),
    handler: () => {},
  };

  function componentTypesFromString(components: string) {
    return components.split(',').map((c) => {
      return componentsMap[c.trim()].type;
    });
  }

  const args = parseCommands(AddCommand);

  if (!projectRoot && !args['projectRoot']) {
    projectRoot = cancelable(
      await text({
        message: cyan('Specify the root of the project (leave empty for "/")'),
        initialValue: '/',
      }),
    );
  }

  // CHOOSE COMPONENTS TO ADD
  let componentsToAdd;

  if (componentsFromInit) {
    componentsToAdd = componentsFromInit.split(',');
  }

  if (!componentsToAdd) {
    componentsToAdd = args['components'] as string[];
  }

  if (!componentsToAdd) {
    componentsToAdd = cancelable(
      await multiselect({
        message: cyan(`Choose which components to add`),
        options: possibleComponents.map((c) => ({
          label: c.displayName,
          value: c.type,
        })),
      }),
    );
  }

  // GENERATE COMPONENTS
  execSync(
    `${getPackageManagerCommand().exec} nx g qwik-ui:component ${componentsToAdd.join(
      ',',
    )} --interactive false --project-root=${projectRoot}`,
    {
      stdio: 'inherit',
    },
  );

  log.success(`Successfully added ${componentsToAdd.join(',')} to your project! 🎉`);
}

function parseCommands(command: CommandModule) {
  return yargs(process.argv.slice(2))
    .parserConfiguration({
      'strip-dashed': true,
      'dot-notation': false,
    })
    .strict()
    .scriptName('qwik-ui')
    .usage(bold('Usage: $0 <command> [options]'))
    .demandCommand(1)
    .command(command)
    .help().argv;
}

interface FilePromptInfo {
  message: string;
  errorMessageName: string;
  initialValue?: string;
}

async function collectFileLocationFromUser(config: FilePromptInfo) {
  const filePath = cancelable(
    await text({
      message: config.message,
      initialValue: config.initialValue,
    }),
  );

  if (!existsSync(filePath)) {
    log.error(`${config.errorMessageName} not found at ${filePath}, want to try again?`);
    return collectFileLocationFromUser({ ...config, initialValue: filePath });
  }
  return filePath;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cancelable(result: any) {
  if (isCancel(result)) {
    cancel('Operation canceled');
    process.exit(0);
  }
  return result;
}

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function exitWithError(message: string) {
  log.error(message);
  cancel();
  process.exit(1);
}

export function getCwd(): string {
  return process.env.INIT_CWD?.startsWith(workspaceRoot)
    ? process.env.INIT_CWD
    : process.cwd();
}
