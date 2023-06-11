## Installation

### ESLint

yarn add --dev eslint

### Prettier

yarn add --dev prettier eslint-config-prettier eslint-plugin-prettier

### TypeScript support

yarn add --dev typescript @typescript-eslint/parser @nuxtjs/eslint-config-typescript

## Configuration

```
// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: [],
  rules: { 'no-console': 0 },
}
```

```
//.prettierrc
{
  "semi": false,
  "singleQuote": true
}
```

```
//package.json
{
  "scripts": {
    // ...
    "lint:js": "eslint --ext \".ts,.vue\" --ignore-path .gitignore .",
    "lint:prettier": "prettier --check .",
    "lint": "yarn lint:js && yarn lint:prettier",
    "lintfix": "prettier --write --list-different . && yarn lint:js --fix"
    // ...
  }
}
```
