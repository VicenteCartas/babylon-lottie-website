import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    // Disables pre-bundling so you can see original dependency module requests.
    disabled: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    sourcemap: false,
    // Keep each module as a separate file in dist (best effort for inspection).
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      output: {
        preserveModules: true,
        preserveModulesRoot: '.',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
        format: 'es'
      }
    }
  },
});
