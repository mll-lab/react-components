import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// required for running storybook/storyshots smoke tests through jest
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

registerRequireContextHook();
