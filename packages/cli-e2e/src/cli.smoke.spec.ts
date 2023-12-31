import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';

describe('Qwik UI CLI Smoke test', () => {
  let projectDirectory: string;

  beforeAll(() => {
    projectDirectory = createTestQwikProject();
  });

  afterAll(() => {
    // Cleanup the test project
    rmSync(projectDirectory, {
      recursive: true,
      force: true,
    });
  });

  it('should be installed and add the button file', () => {
    execSync(
      'npx -y init qwik-ui@e2e init --e2e --projectRoot / --styledKit "fluffy" --uiComponentsPath "src/components/ui" --rootCssPath "src/global.css" --installTailwind --components=button',
      {
        cwd: projectDirectory,
        stdio: 'inherit',
      },
    );
    const buttonIsInTheRightPlace = existsSync(
      join(projectDirectory, 'src/components/ui/button/button.tsx'),
    );
    expect(buttonIsInTheRightPlace).toBeTruthy();
  });
});

/**
 * Creates a test project
 * @returns The directory where the test project was created
 */
function createTestQwikProject() {
  const projectName = 'test-qwik-project';
  const projectDirectory = join(process.cwd(), 'tmp', projectName);

  // Ensure projectDirectory is empty
  rmSync(projectDirectory, {
    recursive: true,
    force: true,
  });
  mkdirSync(dirname(projectDirectory), {
    recursive: true,
  });

  execSync(`pnpm create qwik@latest `, {
    cwd: dirname(projectDirectory),
    stdio: 'inherit',
    env: process.env,
  });
  console.log(`Created test project in "${projectDirectory}"`);

  return projectDirectory;
}
