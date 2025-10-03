import { defineConfig } from 'vite';

// Production configuration: Maximum optimization for smallest bundle size.
// Key optimizations:
// - Aggressive minification (terser with advanced options)
// - Maximum tree-shaking (sideEffects: false assumptions)
// - Smart chunking strategy to leverage browser caching
// - Compression and size analysis
// - Dead code elimination and unused import removal

export default defineConfig({
  // Production mode enables tree-shaking by default
  mode: 'production',
  
  build: {
    target: 'es2020', // Modern target for better optimization
    minify: 'terser', // Use Terser for maximum compression
    
    // Terser options for aggressive minification
    terserOptions: {
      compress: {
        drop_console: true,        // Remove console.log statements
        drop_debugger: true,       // Remove debugger statements
        dead_code: true,           // Remove unreachable code
        unused: true,              // Remove unused variables/functions
        collapse_vars: true,       // Collapse single-use variables
        reduce_vars: true,         // Reduce variables to direct values
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Mark as pure (removable)
        passes: 2,                 // Multiple optimization passes
      },
      mangle: {
        toplevel: true,            // Mangle top-level names
        properties: {
          regex: /^_/,             // Mangle properties starting with _
        },
      },
      format: {
        comments: false,           // Remove all comments
      },
    },
    
    // Rollup options for optimal chunking and tree-shaking
    rollupOptions: {
      // Aggressive tree-shaking
      treeshake: {
        moduleSideEffects: false,  // Assume no side effects for better tree-shaking
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      
      output: {
        // Fix worker format issue by inlining dynamic imports
        // Note: manualChunks is incompatible with inlineDynamicImports
        inlineDynamicImports: true,
        
        // Optimized file naming for caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        
        // Additional compression options
        compact: true,
        generatedCode: {
          constBindings: true,     // Use const instead of var
          objectShorthand: true,   // Use object shorthand
          arrowFunctions: true,    // Use arrow functions
        },
      },
    },
    
    // Bundle analysis and size limits
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000, // Warn for chunks > 1MB
    
    // Source maps for production debugging (optional - remove to save more space)
    sourcemap: false,
    
    // CSS optimization
    cssCodeSplit: true,          // Split CSS for better caching
    cssMinify: 'lightningcss',   // Use Lightning CSS for faster/smaller CSS minification
  },
  
  // Dependency optimization for production
  optimizeDeps: {
    // Include all dependencies to ensure they're pre-bundled optimally
    include: [
      '@babylonjs/core',
      '@babylonjs/lottie-player', 
      '@babylonjs/loaders'
    ],
  },
  
  // Additional production optimizations
  define: {
    // Remove development-only code
    __DEV__: false,
    'process.env.NODE_ENV': '"production"',
  },
  
  // Experimental optimizations (if supported by your Vite version)
  experimental: {
    renderBuiltUrl(filename: string) {
      // Custom URL handling for CDN deployment
      return filename;
    },
  },
});