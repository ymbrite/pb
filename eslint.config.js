const fs = require('node:fs')
const path = require('node:path')
const { defineConfig, globalIgnores } = require('eslint/config')
const globals = require('globals')
const vueParser = require('vue-eslint-parser')
const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const vuePlugin = require('eslint-plugin-vue')
const js = require('@eslint/js')
const prettier = require('eslint-config-prettier')
const espree = require('espree')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

const nuxtAutoImportGlobals = readNuxtAutoImportGlobals()

function readNuxtAutoImportGlobals() {
  const nuxtImportsPath = path.resolve(__dirname, '.nuxt/imports.d.ts')
  if (!fs.existsSync(nuxtImportsPath)) {
    return {}
  }

  const content = fs.readFileSync(nuxtImportsPath, 'utf8')
  const exportBlockRegexp = /export \{([^}]+)\} from/gm
  const identifiers = new Set()

  let match
  while ((match = exportBlockRegexp.exec(content)) !== null) {
    const block = match[1]
    block
      .split(',')
      .map(token => token.trim())
      .filter(Boolean)
      .forEach(token => {
        const [name] = token.split(/\s+as\s+/)
        if (/^[A-Za-z_$][\w$]*$/.test(name)) {
          identifiers.add(name)
        }
      })
  }

  return Object.fromEntries([...identifiers].map(key => [key, 'readonly']))
}

module.exports = defineConfig([
  globalIgnores([
    '**/node_modules/**',
    'dist',
    'coverage',
    '.nuxt',
    '**/.nuxt/**',
    'pages/demo/geo.vue', // 临时忽略
  ]),
  {
    files: ['**/*.{ts,tsx,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...nuxtAutoImportGlobals,
      },
      parser: vueParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      vue: vuePlugin,
    },
    extends: compat.extends(
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'plugin:@typescript-eslint/recommended-type-checked',
      'prettier',
    ),
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', disallowTypeAnnotations: false },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-v-html': 'off',
    },
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: espree,
      ecmaVersion: 'latest',
      sourceType: 'script',
    },
    plugins: {
      vue: vuePlugin,
    },
    extends: [js.configs.recommended, prettier],
  },
])
