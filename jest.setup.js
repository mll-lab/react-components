/* eslint-disable @typescript-eslint/no-var-requires */
require('@testing-library/jest-dom');
require('@testing-library/jest-dom/extend-expect');

const configureTestingLibrary = require('@testing-library/react').configure;

configureTestingLibrary({ testIdAttribute: 'id' });

// Used by some antd components, such as List, and not implemented in jsdom
Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
});
