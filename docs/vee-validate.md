```sh

# 安裝
yarn add vee-validate

# 使用zod,範例<FormExample1 />
yarn add zod @vee-validate/zod

# 使用vee-validate多國語系<FormExample2 />
yarn add @vee-validate/i18n

# 使用vee-validate規則,範例<FormExample2 />
yarn add @vee-validate/rules

# nuxt套件
yarn add @vee-validate/nuxt
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // ...
  modules: [
    //...
    "@vee-validate/nuxt",
  ],
});
```
