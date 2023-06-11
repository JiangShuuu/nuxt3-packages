## Installation

```sh
yarn add tailwindcss postcss autoprefixer

npx tailwindcss init
```

## Configuration

### ./nuxt.config.ts

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

### ./tailwind.config.js

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

### ./assets/css/main.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### ./nuxt.config.ts

```diff
export default defineNuxtConfig({
+ css: ['~/assets/css/main.css'],
  postcss: {
    ...
  }
```

## Test

```vue
<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
</template>
```
