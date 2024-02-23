// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
    stylistic: {
        indent: 4,
    },
    vue: {
        overrides: {
            'vue/component-tags-order': ['error', {
                order: ['template', 'script', 'style'],
            }],
        },
    },
    ignores: [],
})
