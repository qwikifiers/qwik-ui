// TODO: fix CLI tests when Shai or Maieul have more time to work on Qwik UI CLI

// import { execSync } from 'child_process';
// import { existsSync, mkdirSync, rmSync } from 'fs';
// import { join } from 'path';

// describe('Qwik UI CLI Smoke test', () => {
//   let projectDirectory: string;
//   let tempDirectory: string;

//   beforeAll(() => {
//     const { projectDirectory: projDir, tempDir } = createTestQwikProject();

//     projectDirectory = projDir;
//     tempDirectory = tempDir;
//   });

//   afterAll(() => {
//     // Cleanup the test project
//     rmSync(tempDirectory, {
//       recursive: true,
//       force: true,
//     });
//   });

//   it('should be installed and add the button file', () => {
//     execSync(
//       'npx -y qwik-ui@e2e init --e2e --projectRoot ./ --uiComponentsPath "src/components/ui" --rootCssPath "src/global.css" --installTailwind --style "simple" --components=button',
//       {
//         cwd: projectDirectory,
//         env: process.env,
//         stdio: 'inherit',
//       },
//     );
//     execSync('npx -y qwik-ui@e2e add button', {
//       cwd: projectDirectory,
//       env: process.env,
//       stdio: 'inherit',
//     });
//     const buttonIsInTheRightPlace = existsSync(
//       join(projectDirectory, 'src/components/ui/button/button.tsx'),
//     );
//     expect(buttonIsInTheRightPlace).toBeTruthy();
//   });
// });

// /**
//  * Creates a test project
//  * @returns The directory where the test project was created
//  */
// function createTestQwikProject() {
//   const projectName = 'test-qwik-project';
//   const tempDir = join('/tmp', 'tmp-qwik-ui-cli-e2e');

//   // Ensure projectDirectory is empty
//   rmSync(tempDir, {
//     recursive: true,
//     force: true,
//   });
//   mkdirSync(tempDir, {
//     recursive: true,
//   });

//   execSync(`pnpm create qwik@latest empty ${projectName}`, {
//     cwd: tempDir,
//     stdio: 'inherit',
//     env: process.env,
//   });
//   console.log(`Created test project in "${tempDir}"`);

//   const projectDirectory = join(tempDir, projectName);

//   return {
//     projectDirectory,
//     tempDir,
//   };
// }
