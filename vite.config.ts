import { defineConfig, type Connect } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";
import tailwindcss from '@tailwindcss/vite';

const serveTvLite: Connect.NextHandleFunction = (req, _res, next) => {
  if (/^\/turnos\/tv-lite\/[^/?]+\/?(?:\?.*)?$/.test(req.url ?? "")) {
    req.url = "/turnos-tv-lite.html";
  }
  next();
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "turnos-tv-lite-route",
      configureServer(server) {
        server.middlewares.use(serveTvLite);
      },
      configurePreviewServer(server) {
        server.middlewares.use(serveTvLite);
      },
    },
    react(),
    svgr({
      // Configuración de SVGR
      svgrOptions: {
        icon: true, // Hace que el SVG sea responsivo y tome el tamaño del contenedor
        typescript: false, // Desactivar TypeScript para evitar conflictos con esbuild
        dimensions: false,
        expandProps: "end",
      },
    }),
    tailwindcss(),
  ],
  base: '/',
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      '@' : path.resolve(__dirname, './src'),
      '@dash' : path.resolve(__dirname, './src/featuures/Dashboards/app'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        tvLite: path.resolve(__dirname, "turnos-tv-lite.html"),
      },
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
  optimizeDeps: {
    include: ["react-pdf", "pdfjs-dist"],
  },
  preview: {
    port: 4173,
    host: true
  }
});
