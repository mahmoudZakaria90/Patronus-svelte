module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'standard-with-typescript',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'implicit-arrow-linebreak': 0,
    'object-curly-newline': 0,
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
    'no-console': ['warn', { allow: ['error'] }],
    'operator-linebreak': 0,
    'no-use-before-define': 0,
    'import/no-extraneous-dependencies': 0,
    'consistent-return': 0,
    'default-param-last': 0,
    'no-unused-vars': 'warn',
    'svelte/no-unused-vars': 'warn',
    'func-names': 0,
  },
};
