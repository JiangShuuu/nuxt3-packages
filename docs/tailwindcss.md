## 1

```sh
yarn add tailwindcss postcss autoprefixer

npx tailwindcss init
```

## 2

./nuxt.config.ts

```diff
export default defineNuxtConfig({
+  postcss: {
+    plugins: {
+      tailwindcss: {},
+      autoprefixer: {},
+    },
+  },
});
```

### 3

./tailwind.config.js

```diff
module.exports = {
  content: [
+   './components/**/*.{js,vue,ts}',
+   './layouts/**/*.vue',
+   './pages/**/*.vue',
+   './plugins/**/*.{js,ts}',
+   './nuxt.config.{js,ts}',
+   './app.vue',
  ],
  ...
}
```

### 4

./assets/css/main.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

./nuxt.config.ts

```diff
export default defineNuxtConfig({
+ css: ['~/assets/css/main.css'],
  postcss: {
    ...
  }
```

### 5

./pages/tailwindcss.vue

```vue
<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
</template>
```
