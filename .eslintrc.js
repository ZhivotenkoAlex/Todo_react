module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    quotes: [2, 'single', { allowTemplateLiterals: true }],
    'import/no-unresolved': 'off',
    'no-console': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/destructuring-assignment': [2, 'always', { ignoreClassFields: true }],
    'react/jsx-equals-spacing': [2, 'always'],
    'jsx-a11y/aria-role': [0],
    'jsx-a11y/label-has-for': [2, {
      components: ['Label'],
      required: {
        some: ['nesting', 'id'],
      },
      allowChildren: false,
    }],
    'react/prefer-stateless-function': [0, { ignorePureComponents: true }],
    'no-useless-constructor': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'import/extensions': [0],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
  },
  extends: ['airbnb'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    // import/parsers : @typescript-eslint/parser: [ .ts, .tsx ]
  },
};
