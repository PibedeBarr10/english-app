// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
    stylistic: {
        indent: 4,
    },
    vue: {
        overrides: {
            'vue/block-order': ['error', {
                order: ['template', 'script', 'style'],
            }],
            'vue/html-self-closing': ['error', {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            }],
            'vue/max-attributes-per-line': ['error', {
                singleline: {
                    max: 1,
                },
                multiline: {
                    max: 1,
                },
            }],
        },
    },
    typescript: {
        overrides: {
            'ts/consistent-type-definitions': ['error', 'type'],
            'no-console': ['error', { allow: ['log', 'warn', 'error'] }],
        },
    },
    // formatters: {
    //     /**
    //      * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
    //      * By default uses Prettier
    //      */
    //     css: true,
    // },
    ignores: [
        // 'package.json',
        // 'tsconfig.json',
        // '.vscode/settings.json',
    ],
})
