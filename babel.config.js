module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-transform-runtime',
    [
      // https://4x.ant.design/docs/react/getting-started#Import-on-Demand
      'import',
      {
        libraryName: 'antd',
        style: false,
      },
    ],
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
};
