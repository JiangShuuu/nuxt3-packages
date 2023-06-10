### 1

```sh
yarn add daisyui
```

### 2

./tailwind.config.js

```diff
module.exports = {
  ...
+ plugins: [require('daisyui')],
+ daisyui: {
+   themes: false,
+ },
}
```
