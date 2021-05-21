module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'react-app',
    'react-app/jest',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    'linebreak-style': 0,
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
