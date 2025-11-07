module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-webpack5-compiler-babel',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    });

    // Suppress warnings about TypeScript type-only re-exports
    // These are harmless - types are stripped during compilation, but webpack still tries to verify them
    config.ignoreWarnings = [
      /export .* \(reexported as .*\) was not found/,
    ];

    return config;
  },
};
