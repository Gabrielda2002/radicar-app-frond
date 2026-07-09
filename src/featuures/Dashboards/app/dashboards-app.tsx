import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@dash/lib/theme";
import { ResumenPage } from "@dash/pages/resumen";
import { EjecucionNtPage } from "@dash/pages/ejecucion-nt";
import { FinancieroPage } from "@dash/pages/financiero";
import { CalidadPage } from "@dash/pages/calidad";
import { PymPage } from "@dash/pages/pym";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * App de paneles embebida nativamente en radicar. Provee su propio
 * QueryClient (scoped) y rutas anidadas bajo /paneles/*. El contenedor
 * `.dnt-root` scopea los tokens de estilo M3.
 */
export default function DashboardsApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="dnt-root min-h-full">
          <Routes>
            <Route index element={<Navigate to="resumen" replace />} />
            <Route path="resumen" element={<ResumenPage />} />
            <Route path="ejecucion-nt" element={<EjecucionNtPage />} />
            <Route path="financiero" element={<FinancieroPage />} />
            <Route path="calidad" element={<CalidadPage />} />
            <Route path="pym" element={<PymPage />} />
            <Route path="*" element={<Navigate to="resumen" replace />} />
          </Routes>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
