import { defineConfig } from 'vite';

// Clean production configuration with worker support for the Babylon Lottie Player.
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
      mangle: { toplevel: true },
      format: { comments: false },
    },
    rollupOptions: {
      treeshake: {
        moduleSideEffects: (id) => {
          if (!id) return false;
          if (id.includes('Sprites/spriteRenderer')) return true;
          if (id.includes('Shaders/sprites')) return true;
          if (id.includes('Engines/Extensions/engine.')) return true;
          return false;
        },
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
  worker: {
    format: 'es',
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});