import { defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vue'],
    }),
    Components({
      dirs: ['./components'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '~': '..',
    },
  },
})
