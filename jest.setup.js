import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// TODO switch back to enzyme https://github.com/enzymejs/enzyme/issues/2429
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// required for running storybook/storyshots smoke tests through jest
// @ts-ignore
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import { configure } from 'enzyme';

registerRequireContextHook();

configure({ adapter: new Adapter() });

// Used by some antd components, such as List, and not implemented in jsdom
Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
});
