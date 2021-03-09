module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    extends: ['plugin:vue/vue3-essential', 'alloy', 'alloy/vue', 'alloy/typescript'],
    plugins: ['prettier'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    rules: {
        // eslint-plugin-prettier
        'prettier/prettier': 'error',

        // overrides eslint-config-alloy/vue
        /**
         * 组件中必须按照 <template>, <script>, <style> 排序
         */
        'vue/component-tags-order': [
            'error',
            {
                order: ['template', 'script', 'style']
            }
        ],

        'no-return-assign': 'off',
        'prefer-promise-reject-errors': 'off',
        '@typescript-eslint/no-loss-of-precision': 'off',
        '@typescript-eslint/prefer-promise-reject-errors': 'off',
        '@typescript-eslint/no-duplicate-imports': 'off'
    },
    overrides: [
        {
            files: '*.js',
            rules: {
                '@typescript-eslint/no-require-imports': 'off'
            }
        }
    ]
};
