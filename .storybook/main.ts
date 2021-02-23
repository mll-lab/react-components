const babel = require('../babel.config.js');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
  ],
  babel: (options: any) => {
    options.plugins.push(...babel.plugins);
    return options;
  },
};
