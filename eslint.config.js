// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
    stylistic: {
        indent: 4,
    },
    vue: {
        overrides: {
            // 'vue/operator-linebreak': ['error', 'before'],
        },
    },
    ignores: [],
})
