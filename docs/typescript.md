## Installation

```sh
yarn add typescript vue-tsc
```

## Configuration

### ./nuxt.config.ts

```diff
export default defineNuxtConfig({
  ....
+  typescript: {
+    strict: true,
+    typeCheck: true,
+  }
});
```

## Test

```
<script setup lang="ts">
const a: Number = 'test'
</script>
```
