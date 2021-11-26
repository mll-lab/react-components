require('@testing-library/jest-dom');
require('@testing-library/jest-dom/extend-expect');

const configureTestingLibrary = require('@testing-library/react').configure;
// required for running storybook/storyshots smoke tests through jest
// @ts-expect-error because it is a plain JS module without any types
const registerRequireContextHook = require('babel-plugin-require-context-hook/register');
const configureEnzyme = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16');

configureTestingLibrary({ testIdAttribute: 'id' });

registerRequireContextHook();

configureEnzyme({ adapter: new Adapter() });

// Used by some antd components, such as List, and not implemented in jsdom
Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
});
