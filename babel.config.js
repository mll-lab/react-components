module.exports = {
  // presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    // 'babel-plugin-styled-components',
    '@babel/plugin-transform-runtime',
    [
      'import',
      {
        libraryName: 'antd',
        style: true,
      },
    ],
  ],
};
