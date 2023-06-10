### 1

```sh
yarn add @headlessui/vue
```

### 2

./nuxt.config.ts

```diff
export default defineNuxtConfig({
+ build: {
+   transpile: ['@headlessui/vue'],
+ },
  ...
})
```
