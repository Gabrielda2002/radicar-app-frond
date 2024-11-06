import { lazy, Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { Route, Routes } from "react-router-dom";

//TODO:

//*PRINCIPAL LAZY ROUTES*

const Cucuta = lazy(() => import("../pages/SistemaDeInventario/Sedes/Cucuta"));
const Cundinamarca = lazy(
  () => import("../pages/SistemaDeInventario/Sedes/Cundinamarca")
);
const Amazonas = lazy(
  () => import("../pages/SistemaDeInventario/Sedes/Amazonas")
);

//*SECONDARY LAZY ROUTES*
//!----------------------------------------------------------------//
const SedeAmazonas01 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Amazonas Categorias y Sedes/sede01"
    )
);

//!----------------------------------------------------------------//
const SedeCucuta01 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/sede01"
    )
);

const SedeCucuta02 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/sede03"
    )
);

const SedeCucuta03 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/sede04"
    )
);
const SedeCucuta04 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/sede05"
    )
);

const SedeCucuta05 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/sede06"
    )
);

const SedeCucuta06 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/sede07"
    )
);
//!----------------------------------------------------------------//

const SedeCundinamarca01 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cundinamarca Categorias y Sedes/sede01"
    )
);

const SedeCundinamarca02 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cundinamarca Categorias y Sedes/sede03"
    )
);
const SedeCundinamarca03 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cundinamarca Categorias y Sedes/sede04"
    )
);
const SedeCundinamarca04 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cundinamarca Categorias y Sedes/sede05"
    )
);
//??? should be replaced with something more generic if need it (JOSTIN GOMEZ)???
//*CUCUTA CATEGORIES*//

const ComputadoresCucuta01 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/Categorias sede01/Computadores"
    )
);
const PerifericosCucuta01 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/Categorias sede01/Perifericos"
    )
);

const ComputadoresCucuta02 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/Categorias sede03/Computadores"
    )
);
const PerifericosCucuta02 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/Categorias sede03/Perifericos"
    )
);

const ComputadoresCucuta03 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/Categorias sede04/Computadores"
    )
);
const PerifericosCucuta03 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/Categorias sede04/Perifericos"
    )
);

const ComputadoresCucuta04 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/Categorias sede05/Computadores"
    )
);
const PerifericosCucuta04 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/Categorias sede05/Perifericos"
    )
);

const ComputadoresCucuta05 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/Categorias sede06/Computadores"
    )
);
const PerifericosCucuta05 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/Categorias sede06/Perifericos"
    )
);

const ComputadoresCucuta06 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/Categorias sede07/Computadores"
    )
);
const PerifericosCucuta06 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cucuta Categorias y Sedes/Categorias sede07/Perifericos"
    )
);

//??? should be replaced with something more generic if need it (JOSTIN GOMEZ)???
//*CUNDINAMARCA CATEGORIES*//

const ComputadoresCundinamarca01 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cundinamarca Categorias y Sedes/Categorias sede01/Computadores"
    )
);

const PerifericosCundinamarca01 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cundinamarca Categorias y Sedes/Categorias sede01/Perifericos"
    )
);

const ComputadoresCundinamarca02 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cundinamarca Categorias y Sedes/Categorias sede03/Computadores"
    )
);
const PerifericosCundinamarca02 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cundinamarca Categorias y Sedes/Categorias sede03/Perifericos"
    )
);

const ComputadoresCundinamarca03 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cundinamarca Categorias y Sedes/Categorias sede04/Computadores"
    )
);
const PerifericosCundinamarca03 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cundinamarca Categorias y Sedes/Categorias sede04/Perifericos"
    )
);

const ComputadoresCundinamarca04 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cundinamarca Categorias y Sedes/Categorias sede05/Computadores"
    )
);
const PerifericosCundinamarca04 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Cundinamarca Categorias y Sedes/Categorias sede05/Perifericos"
    )
);

//??? should be replaced with something more generic if need it (JOSTIN GOMEZ)???
//*AMAZONAS CATEGORIES*//

const ComputadoresAmazonas01 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Amazonas Categorias y Sedes/Categorias sede01/Computadores"
    )
);

const PerifericosAmazonas01 = lazy(
  () =>
    import(
      "../pages/SistemaDeInventario/Sedes/Amazonas Categorias y Sedes/Categorias sede01/Perifericos"
    )
);

//TODO----------------------------------------------------------------//

export default function InventarioRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <div>
            <LoadingSpinner />
          </div>
        </div>
      }
    >
      <Routes>
        {/* MAIN ROUTES */}
        <Route path="Cucuta" element={<Cucuta />} />

        <Route path="Cundinamarca" element={<Cundinamarca />} />

        <Route path="Amazonas" element={<Amazonas />} />
        {/* SECONDARY ROUTES */}
        {/* CUCUTA ROUTES OF SITES */}
        <Route path="Cucuta/Sede01" element={<SedeCucuta01 />} />
        <Route path="Cucuta/sede03" element={<SedeCucuta02 />} />
        <Route path="Cucuta/sede04" element={<SedeCucuta03 />} />
        <Route path="Cucuta/sede05" element={<SedeCucuta04 />} />
        <Route path="Cucuta/sede06" element={<SedeCucuta05 />} />
        <Route path="Cucuta/sede07" element={<SedeCucuta06 />} />
        {/* CUNDINAMARCA ROUTES OF SITES */}
        <Route path="Cundinamarca/Sede01C" element={<SedeCundinamarca01 />} />
        <Route path="Cundinamarca/Sede03C" element={<SedeCundinamarca02 />} />
        <Route path="Cundinamarca/Sede04C" element={<SedeCundinamarca03 />} />
        <Route path="Cundinamarca/Sede05C" element={<SedeCundinamarca04 />} />
        {/* AMAZONAS ROUTE OF SITE */}
        <Route path="Amazonas/Sede01A" element={<SedeAmazonas01 />} />
        {/* CUCUTA CATEGORIES */}
        <Route
          path="Cucuta/Sede01/computadores"
          element={<ComputadoresCucuta01 />}
        />
        <Route
          path="Cucuta/Sede01/perifericos"
          element={<PerifericosCucuta01 />}
        />

        <Route
          path="Cucuta/Sede03/computadores"
          element={<ComputadoresCucuta02 />}
        />
        <Route
          path="Cucuta/Sede03/Perifericos"
          element={<PerifericosCucuta02 />}
        />

        <Route
          path="Cucuta/Sede04/computadores"
          element={<ComputadoresCucuta03 />}
        />
        <Route
          path="Cucuta/Sede04/perifericos"
          element={<PerifericosCucuta03 />}
        />

        <Route
          path="Cucuta/Sede05/computadores"
          element={<ComputadoresCucuta04 />}
        />
        <Route
          path="Cucuta/Sede05/perifericos"
          element={<PerifericosCucuta04 />}
        />

        <Route
          path="Cucuta/Sede06/computadores"
          element={<ComputadoresCucuta05 />}
        />
        <Route
          path="Cucuta/Sede06/perifericos"
          element={<PerifericosCucuta05 />}
        />

        <Route
          path="Cucuta/Sede07/computadores"
          element={<ComputadoresCucuta06 />}
        />
        <Route
          path="Cucuta/Sede07/perifericos"
          element={<PerifericosCucuta06 />}
        />
        {/* CUNDINAMARCA CATEGORIES */}
        <Route
          path="Cundinamarca/Sede01C/computadores"
          element={<ComputadoresCundinamarca01 />}
        />
        <Route
          path="Cundinamarca/Sede01C/perifericos"
          element={<PerifericosCundinamarca01 />}
        />
        <Route
          path="Cundinamarca/Sede03C/computadores"
          element={<ComputadoresCundinamarca02 />}
        />
        <Route
          path="Cundinamarca/Sede03C/perifericos"
          element={<PerifericosCundinamarca02 />}
        />
        <Route
          path="Cundinamarca/Sede04C/computadores"
          element={<ComputadoresCundinamarca03 />}
        />
        <Route
          path="Cundinamarca/Sede04C/perifericos"
          element={<PerifericosCundinamarca03 />}
        />
        <Route
          path="Cundinamarca/Sede05C/computadores"
          element={<ComputadoresCundinamarca04 />}
        />
        <Route
          path="Cundinamarca/Sede05C/perifericos"
          element={<PerifericosCundinamarca04 />}
        />
        {/* AMAZONAS CATEGORIES */}
        <Route
          path="Amazonas/Sede01A/computadores"
          element={<ComputadoresAmazonas01 />}
        />
        <Route
          path="Amazonas/Sede01A/perifericos"
          element={<PerifericosAmazonas01 />}
        />
      </Routes>
    </Suspense>
  );
}
