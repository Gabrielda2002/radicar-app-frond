import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
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

export default function DashboardsApp() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
