module.exports = {
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
  prettierPath: require.resolve('prettier-2'),
}; 