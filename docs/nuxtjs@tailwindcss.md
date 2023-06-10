## 1

```sh
yarn add @nuxtjs/tailwindcss

npx tailwindcss init --ts
```

## 2

./nuxt.config.ts

```diff
export default defineNuxtConfig({
+  modules: [
+    '@nuxtjs/tailwindcss'
+  ],
});
```
