### 1

```sh
# Unit
yarn add -D @nuxt/test-utils vitest @vitest/coverage-c8
# UI
yarn add -D jsdom @vitejs/plugin-vue @vue/test-utils
```

### 2

./package.json

```diff
  "scripts": {
+   "test": "vitest",
+   "coverage": "vitest run --coverage"
  }
```
