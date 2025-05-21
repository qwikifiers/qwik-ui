import type { Config } from 'jest';

const config: Config = {
  displayName: 'qwikui-cli',
  preset: '../../jest.preset.cjs',
  globals: {},
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  restoreMocks: true,
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/cli',
  // @ts-expect-error declaration file
  prettierPath: import('prettier-2').path,
};

export default config;
