import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    ssrManifest: true,
    outDir: 'dist/client',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.ts'),
        server: path.resolve(__dirname, 'src/entry-server.ts')
      }
    }
  },
  optimizeDeps: {
    include: ['vue']
  }
}); 