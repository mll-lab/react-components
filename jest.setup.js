/* eslint-disable @typescript-eslint/no-var-requires */
require('@testing-library/jest-dom');

const testingLibraryReact = require('@testing-library/react');

testingLibraryReact.configure({ testIdAttribute: 'id' });

// Used by some antd components, such as List, and not implemented in jsdom
Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
});
