import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { configure as configureTestingLibrary } from '@testing-library/react';
// required for running storybook/storyshots smoke tests through jest
// @ts-ignore
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import { configure as configureEnzyme } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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
