import { Suspense, lazy } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

const DashboardsApp = lazy(
  () => import("@/featuures/Dashboards/app/dashboards-app"),
);

/**
 * Punto de montaje del feature de Paneles (BI) dentro de radicar. Antes era un
 * iframe al proyecto Dashboard separado; ahora es el dashboard portado de forma
 * nativa (rutas anidadas /paneles/*), consumiendo /api/v1 de Api-nordvital.
 */
const Dashboards = () => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner />
      </div>
    }
  >
    <DashboardsApp />
  </Suspense>
);

export default Dashboards;
