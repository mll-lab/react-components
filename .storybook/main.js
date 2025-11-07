module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },
  core: {
    disableTelemetry: false,
  },
  webpackFinal: (config) => {
    config.module.rules = [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ];

    // Suppress warnings about TypeScript type-only re-exports
    // These are harmless - types are stripped during compilation, but webpack still tries to verify them
    config.ignoreWarnings = [
      /export .* \(reexported as .*\) was not found/,
    ];

    return config;
  },
};
