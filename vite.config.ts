import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      $assets: './src/lib/assets',
      $store: './src/lib/store.ts',
      $components: './src/components',
      $utils: './src/lib/utils',
    },
  },
});
