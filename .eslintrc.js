module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react',
    '@mll-lab/eslint-config/react',
    '@mll-lab/eslint-config',
    'plugin:@mll-lab/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['jsx-a11y', 'testing-library'],
  ignorePatterns: ['dist', '!.storybook', 'yarn.lock'],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.eslint.json'],
  },
  rules: {
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        // NOTE: If this error triggers, either disable it or add
        // your custom components, labels and attributes via these options
        // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        controlComponents: ['Input'],
      },
    ],
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'react/function-component-definition': 'off', // Incompatible with stories
  },
  settings: {
    react: {
      version: '16.13',
    },
  },
};
