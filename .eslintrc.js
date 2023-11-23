module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import'],
  extends: ['plugin:vue/vue3-essential', 'alloy', 'alloy/typescript', 'alloy/vue', 'prettier'],
  rules: {
    'vue/no-v-model-argument': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-empty-component-block': 0,
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
