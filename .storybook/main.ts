const baseConfig = require('../webpack.config.js');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
  ],
  webpackFinal: (config: any): any => {
    config.module.rules = baseConfig.module.rules;
    config.resolve.extensions = baseConfig.resolve.extensions;

    return config;
  },
};
