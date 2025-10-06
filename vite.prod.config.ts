import { defineConfig } from 'vite';

// Option 2: Create separate chunks for lottie-player vs babylon core.
// Assumes @babylonjs/loaders has been removed from dependencies.
export default defineConfig({
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_getters: true,
        module: true,
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('@babylonjs/lottie-player')) return 'lottie-player';
          if (id.includes('@babylonjs/core')) return 'babylon-core';
        },
      },
    },
  },
});