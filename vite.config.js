import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $routes: path.resolve('./src/lib/routes'),
      $components: path.resolve('./src/lib/components'),
      $firebase: path.resolve('./src/lib/firebase'),
      $utils: path.resolve('./src/lib/utils'),
      $stores: path.resolve('./src/lib/stores'),
    }
  }
})
