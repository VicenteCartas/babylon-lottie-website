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
        passes: 4,
        pure_getters: true,
        module: true,
      },
      mangle: { toplevel: true },
      format: { comments: false },
    },
    rollupOptions: {
      treeshake: {
        preset: 'smallest',
        moduleSideEffects: false,
      },
      output: {
        inlineDynamicImports: false,
      },
    },
  },
  worker: {
    format: 'es',
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
      },
    },
  },
});