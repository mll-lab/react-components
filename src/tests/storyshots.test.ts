import initStoryshots, { renderWithOptions } from '@storybook/addon-storyshots';
import { mount } from 'enzyme';

// Ensure the stories are rendered without an error
initStoryshots({
  test: renderWithOptions({
    // Overwrite the default react test renderer, as it does not support
    // refs and portals, both of which are heavily used by antd
    // https://github.com/facebook/react/issues/11565
    renderer: mount,
  }),
});
