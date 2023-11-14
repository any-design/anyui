module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['plugin:vue/vue3-essential', 'alloy', 'alloy/typescript', 'alloy/vue', 'prettier'],
  rules: {
    'vue/no-v-model-argument': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-empty-component-block': 0,
  },
};
