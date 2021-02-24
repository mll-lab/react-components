import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// required for running storybook/storyshots smoke tests through jest
// @ts-ignore
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

registerRequireContextHook();

configure({ adapter: new Adapter() });
