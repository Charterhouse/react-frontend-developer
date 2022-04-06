module.exports = {
  parser: '@babel/eslint-parser',
  globals: {
    __PATH_PREFIX__: true,
    cy: 'readonly',
    Cypress: 'readonly'
  },
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  settings: {
    react: {
      version: 'detect'
    },
    jest: {
      version: require('jest/package.json').version
    }
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jest/recommended',
    'plugin:jest/style'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    babelOptions: {
      presets: ['@babel/preset-react']
    },
    requireConfigFile: false,
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jest'
  ],
  rules: {
    'react/prop-types': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'jest/expect-expect': 0
  }
}
