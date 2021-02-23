const { getThemeVariables } = require('antd/dist/theme');
const path = require('path');
const externalReact = require('webpack-external-react');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: '@mll-lab/react-components',
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  ...getThemeVariables({
                    compact: true,
                  }),
                  // Customize the antd theme by overwriting less variables
                  // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
                  // Colors
                  '@primary-color': '#50a0d0',
                  '@text-color': 'fade(#000, 85%)',
                  '@text-color-secondary': 'fade(#000, 65%)',
                  '@heading-color': 'fade(#000, 85%)',
                  '@link-color': '#000000',
                  '@disabled-color': 'fade(#000, 85%)',
                  '@warning-color': '#faad14',
                  '@input-disabled-bg': '#fafafa',
                  '@layout-header-background': '#eaeaea',
                  '@layout-header-padding': '5px 0px 0px 0px',
                  // Fonts
                  '@font-family':
                    'Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif !important',
                  '@font-size-base': '11px',
                  // Sizes
                  '@form-item-margin-bottom': '0px',
                  '@form-component-max-height': '26px',
                  '@padding-lg': '18px',
                  '@padding-md': '14px',
                  '@padding-sm': '10px',
                  '@padding-xs': '6px',
                  '@input-height-base': '22px',
                  '@input-height-lg': '30px',
                  '@input-height-sm': '18px',
                  '@btn-height-base': '22px',
                  '@btn-height-lg': '30px',
                  '@btn-height-sm': '18px',
                  '@collapse-header-padding': '12px 10px 10px 40px',
                  '@layout-header-height': 'initial',
                  '@tabs-bar-margin': '0px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
    noParse: externalReact.noParse,
  },
  externals: externalReact.externals,
};
