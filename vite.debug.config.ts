import { defineConfig } from 'vite';

// Debug configuration: keep individual modules visible in the browser Network tab.
// Key tactics:
// - disable dependency pre-bundling (optimizeDeps.disabled)
// - preserve module structure in build (preserveModules)
// - turn off minification & sourcemap for clarity (you can enable sourcemap if desired)
// - avoid code splitting by forcing a single entry output naming pattern (but still preserve modules)
// For dev inspection you usually want to run `vite` dev server, which already serves individual source modules.
// However, some dependencies (like @babylonjs/*) may still be pre-bundled by esbuild optimizeDeps step; we disable it here.

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
