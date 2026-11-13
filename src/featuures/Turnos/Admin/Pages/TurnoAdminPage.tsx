import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import {
  DataTable,
  DataTableContainer,
  useTableState,
  type ColumnConfig,
} from "@/components/common/ReusableTable";
import Button from "@/components/common/Ui/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useAuth } from "@/context/authContext";
import { useStoreHeadquarters } from "@/store/useStoreHeadquarters";
import type { ITurnoSedeConfigAdmin } from "@/models/ITurnoAdmin";
import { useStoreTurnoAdmin } from "../store/useStoreTurnoAdmin";
import TurnoPublicLinks from "../Components/TurnoPublicLinks";
import TurnoSedeForm from "../Components/TurnoSedeForm";
import TurnoSedePickerModal, {
  type ITurnoSedeOption,
} from "../Components/TurnoSedePickerModal";
import TurnoModulosSection from "../Components/TurnoModulosSection";

interface ISelectedSede {
  headquarterId: number;
  headquarterName: string;
}

const ADMIN_ROLE = 1;

const TurnoAdminPage = () => {
  const { rol } = useAuth();
  const userRole = Number(rol);

  const sedes = useStoreTurnoAdmin((state) => state.data.sedes);
  const error = useStoreTurnoAdmin((state) => state.error);
  const isLoading = useStoreTurnoAdmin((state) => state.isLoading);
  const loadSedes = useStoreTurnoAdmin((state) => state.loadSedes);
  const headquarters = useStoreHeadquarters((state) => state.headquarters);
  const getHeadquarters = useStoreHeadquarters(
    (state) => state.getHeadquarters,
  );

  const [selected, setSelected] = useState<ISelectedSede | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    void loadSedes();
    void getHeadquarters();
  }, [loadSedes, getHeadquarters]);

  const availableSedes = useMemo<ITurnoSedeOption[]>(
    () =>
      headquarters
        .filter(
          (headquarter) =>
            !sedes.some((sede) => sede.headquarterId === headquarter.id),
        )
        .map((headquarter) => ({ id: headquarter.id, name: headquarter.name })),
    [headquarters, sedes],
  );

  const selectedConfig = useMemo(
    () =>
      selected
        ? (sedes.find(
            (sede) => sede.headquarterId === selected.headquarterId,
          ) ?? null)
        : null,
    [selected, sedes],
  );

  const tableState = useTableState<ITurnoSedeConfigAdmin>({
    data: sedes,
    searchFields: ["headquarterName", "slug"],
    initialItemsPerPage: 10,
  });

  const columns: ColumnConfig<ITurnoSedeConfigAdmin>[] = [
    {
      key: "headquarterName",
      header: "Sede",
      size: "sm",
      accessor: (item) => item.headquarterName,
    },
    {
      key: "slug",
      header: "Slug",
      size: "sm",
      accessor: (item) => item.slug,
    },
    {
      key: "isEnabled",
      header: "Estado",
      size: "xs",
      render: (item) =>
        item.isEnabled ? (
          <span className="text-green-600 dark:text-green-400">Activa</span>
        ) : (
          <span className="text-red-600 dark:text-red-400">Inactiva</span>
        ),
    },
    {
      key: "location",
      header: "Ubicación",
      size: "md",
      render: (item) => `${item.latitude}, ${item.longitude}`,
    },
    {
      key: "geoRadiusMeters",
      header: "Radio",
      size: "xs",
      render: (item) => `${item.geoRadiusMeters} m`,
    },
    {
      key: "averageServiceMinutes",
      header: "Promedio",
      size: "xs",
      render: (item) => `${item.averageServiceMinutes} min`,
    },
  ];

  if (userRole !== ADMIN_ROLE)
    return (
      <p className="p-6 text-center text-slate-600 dark:text-gray-300">
        No tienes permisos para administrar la configuración de turnos.
      </p>
    );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Administración de turnos
        </h2>
        <p className="text-sm text-slate-500 dark:text-gray-400">
          Configura las sedes que ofrecen turnos y sus enlaces públicos.
        </p>
      </div>

      {error ? (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      ) : null}

      {isLoading && sedes.length === 0 ? (
        <LoadingSpinner duration={100000} />
      ) : (
        <DataTableContainer
          searchValue={tableState.searchQuery}
          onSearchChange={tableState.setSearchQuery}
          searchPlaceholder="Buscar sede o slug"
          itemsPerPage={tableState.itemsPerPage}
          onItemsPerPageChange={tableState.setItemsPerPage}
          currentPage={tableState.currentPage}
          totalPages={tableState.totalPages}
          onPageChange={tableState.paginate}
          headerActions={
            <Button
              type="button"
              onClick={() => setIsPickerOpen(true)}
              icon={<Plus className="h-4 w-4" aria-hidden="true" />}
            >
              Agregar sede
            </Button>
          }
        >
          <DataTable
            data={tableState.currentData()}
            columns={columns}
            getRowKey={(item) => String(item.id)}
            loading={isLoading}
            error={error}
            emptyMessage="Todavía no hay sedes configuradas para turnos."
            renderActions={(item) => (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setSelected({
                    headquarterId: item.headquarterId,
                    headquarterName: item.headquarterName,
                  })
                }
                icon={<Pencil className="h-4 w-4" aria-hidden="true" />}
              >
                Editar
              </Button>
            )}
          />
        </DataTableContainer>
      )}

      {selected ? (
        <div className="space-y-6">
          <TurnoSedeForm
            headquarterId={selected.headquarterId}
            headquarterName={selected.headquarterName}
            initial={selectedConfig}
            otherSedes={sedes.filter(
              (sede) => sede.headquarterId !== selected.headquarterId,
            )}
            onSaved={() => undefined}
            onCancel={() => setSelected(null)}
          />
          {selectedConfig ? (
            <TurnoPublicLinks slug={selectedConfig.slug} />
          ) : null}
          {selectedConfig ? (
            <TurnoModulosSection
              headquarterId={selected.headquarterId}
              headquarterName={selected.headquarterName}
            />
          ) : null}
        </div>
      ) : null}

      <TurnoSedePickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        sedes={availableSedes}
        onSelect={(sede) => {
          setIsPickerOpen(false);
          setSelected({
            headquarterId: sede.id,
            headquarterName: sede.name,
          });
        }}
      />
    </div>
  );
};

export default TurnoAdminPage;
