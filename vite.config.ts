import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      '@' : path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        },
        // Forzar extensión .js para todos los assets problemáticos
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && (
            assetInfo.name.includes('pdf.worker') || 
            assetInfo.name.includes('.mjs')
          )) {
            return 'assets/[name].[hash].js';
          }
          return 'assets/[name].[hash].[ext]';
        }
      }
    }
  },
  // Configuración específica para PDF.js workers  
  worker: {
    format: 'es'
  },
  // Eliminar optimizeDeps problemática
  preview: {
    port: 4173,
    host: true
  }
});
