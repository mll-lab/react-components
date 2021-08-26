const esModules = [
  '@mll-lab',
  '@babel',
  'antd/es',
  'antd/node_modules/@babel',
  'antd/node_modules/rc-utils',
].join('|');

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    [`(${esModules}).+\\.js$`]: 'babel-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  roots: ['src'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testPathIgnorePatterns: ['node_modules/'],
  testMatch: ['**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    // Mocks out all these file formats when tests are run.
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
