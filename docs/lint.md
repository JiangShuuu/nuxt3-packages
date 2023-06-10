## eslint

```sh
yarn ad -D eslint

# https://github.com/nuxt/eslint-config - TypeScript
"extends": ["@nuxtjs/eslint-config-typescript"]
yarn add -D @nuxtjs/eslint-config @nuxtjs/eslint-config-typescript

# https://github.com/nuxt-modules/eslint
yarn add -D @nuxtjs/eslint-module

# https://github.com/nuxt/eslint-plugin-nuxt
# "extends": ["plugin:nuxt/recommended"]
yarn add -D eslint-plugin-nuxt

# https://github.com/prettier/eslint-plugin-prettier
yarn add -D eslint-plugin-prettier eslint-config-prettier

# https://github.com/veritem/eslint-plugin-vitest
# "extends": ["plugin:vitest/recommended"]
yarn add -D eslint-plugin-vitest
```

### prettier

```sh
yarn add prettier prettier-plugin-tailwindcss
```

./.prettierrc

```json
{
  "semi": false,
  "singleQuote": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```
