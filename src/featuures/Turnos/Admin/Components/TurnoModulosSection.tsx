import { useEffect, useMemo, useRef, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  DataTable,
  DataTableContainer,
  useTableState,
  type ColumnConfig,
} from "@/components/common/ReusableTable";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import Modal from "@/components/common/Ui/Modal";
import ModalBody from "@/components/common/Ui/ModalBody";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import type { ITurnoModuloAdmin } from "@/models/ITurnoAdmin";
import { useStoreTurnoAdmin } from "../store/useStoreTurnoAdmin";

interface TurnoModulosSectionProps {
  headquarterId: number;
  headquarterName: string;
}

interface IModuloFormValues {
  moduleType: string;
  code: string;
  name: string;
}

const EMPTY_MODULOS: ITurnoModuloAdmin[] = [];

const moduloSchema = Yup.object({
  moduleType: Yup.string()
    .oneOf(["GENERAL", "PRIORITARIO"])
    .required("Selecciona el tipo de atención"),
  code: Yup.string()
    .trim()
    .min(1, "El código es requerido")
    .max(20, "El código debe tener máximo 20 caracteres")
    .required("El código es requerido"),
  name: Yup.string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre debe tener máximo 100 caracteres")
    .required("El nombre es requerido"),
});

const TurnoModulosSection = ({
  headquarterId,
  headquarterName,
}: TurnoModulosSectionProps) => {
  const modulos = useStoreTurnoAdmin(
    (state) => state.data.modulosBySede[headquarterId] ?? EMPTY_MODULOS,
  );
  const isLoading = useStoreTurnoAdmin(
    (state) =>
      state.modulosHeadquarterId !== headquarterId || state.modulosLoading,
  );
  const error = useStoreTurnoAdmin((state) =>
    state.modulosHeadquarterId === headquarterId ? state.modulosError : null,
  );
  const isMutating = useStoreTurnoAdmin((state) => state.moduloMutationLoading);
  const loadModulos = useStoreTurnoAdmin((state) => state.loadModulos);
  const createModulo = useStoreTurnoAdmin((state) => state.createModulo);
  const updateModulo = useStoreTurnoAdmin((state) => state.updateModulo);
  const [editing, setEditing] = useState<ITurnoModuloAdmin | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const active = useRef(true);

  useEffect(() => {
    active.current = true;
    void loadModulos(headquarterId);
    return () => {
      active.current = false;
    };
  }, [headquarterId, loadModulos]);

  const tableState = useTableState<ITurnoModuloAdmin>({
    data: modulos,
    searchFields: ["code", "name"],
    initialItemsPerPage: 10,
  });

  const columns = useMemo<ColumnConfig<ITurnoModuloAdmin>[]>(
    () => [
      {
        key: "code",
        header: "Código",
        size: "sm",
        accessor: (item) => item.code,
      },
      {
        key: "name",
        header: "Nombre",
        size: "md",
        accessor: (item) => item.name,
      },
      {
        key: "isActive",
        header: "Estado",
        size: "sm",
        render: (item) => (
          <span
            className={
              item.isActive
                ? "text-green-600 dark:text-green-400"
                : "text-slate-500 dark:text-gray-400"
            }
          >
            {item.isActive ? "Activo" : "Inactivo"}
          </span>
        ),
      },
      {
        key: "isPriority",
        header: "Tipo",
        size: "sm",
        accessor: (item) => (item.isPriority ? "Prioritario" : "General"),
      },
    ],
    [],
  );

  const formik = useFormik<IModuloFormValues>({
    enableReinitialize: true,
    initialValues: {
      code: editing?.code ?? "",
      name: editing?.name ?? "",
      moduleType: editing
        ? editing.isPriority
          ? "PRIORITARIO"
          : "GENERAL"
        : "",
    },
    validationSchema: moduloSchema,
    onSubmit: async (values) => {
      const input = {
        code: values.code.trim().toUpperCase(),
        name: values.name.trim(),
        isPriority: values.moduleType === "PRIORITARIO",
      };
      const result = editing
        ? await updateModulo(editing.id, input)
        : await createModulo({ headquarterId, ...input });
      if (!active.current) return;
      if (!result.ok) {
        toast.error(result.message ?? "No se pudo guardar el módulo.");
        return;
      }
      toast.success(editing ? "Módulo actualizado" : "Módulo creado");
      setIsFormOpen(false);
      setEditing(null);
      await loadModulos(headquarterId);
    },
  });

  const openCreateForm = () => {
    formik.resetForm({ values: { code: "", name: "", moduleType: "" } });
    setEditing(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    if (isMutating) return;
    setIsFormOpen(false);
    setEditing(null);
  };

  const handleToggleActive = async (modulo: ITurnoModuloAdmin) => {
    const result = await updateModulo(modulo.id, {
      isActive: !modulo.isActive,
    });
    if (!active.current) return;
    if (!result.ok) {
      toast.error(result.message ?? "No se pudo cambiar el estado del módulo.");
      return;
    }
    toast.success(modulo.isActive ? "Módulo desactivado" : "Módulo activado");
    await loadModulos(headquarterId);
  };

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 p-5 dark:border-gray-700">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Módulos de atención
          </h3>
          <p className="text-sm text-slate-500 dark:text-gray-400">
            Sede: {headquarterName}. Los módulos inactivos permanecen visibles.
          </p>
        </div>
        <Button
          type="button"
          onClick={openCreateForm}
          icon={<Plus className="h-4 w-4" aria-hidden="true" />}
        >
          Agregar módulo
        </Button>
      </div>

      {error ? (
        <div
          role="alert"
          className="space-y-2 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
        >
          <p>{error}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void loadModulos(headquarterId)}
          >
            Reintentar
          </Button>
        </div>
      ) : null}

      {isLoading && modulos.length === 0 ? (
        <LoadingSpinner duration={100000} />
      ) : (
        <DataTableContainer
          searchValue={tableState.searchQuery}
          onSearchChange={tableState.setSearchQuery}
          searchPlaceholder="Buscar por código o nombre"
          itemsPerPage={tableState.itemsPerPage}
          onItemsPerPageChange={tableState.setItemsPerPage}
          currentPage={tableState.currentPage}
          totalPages={tableState.totalPages}
          onPageChange={tableState.paginate}
        >
          <DataTable
            data={tableState.currentData()}
            columns={columns}
            getRowKey={(item) => item.id}
            loading={isLoading}
            emptyMessage="Esta sede todavía no tiene módulos de atención. Agrega el primero para comenzar."
            renderActions={(item) => (
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditing(item);
                    setIsFormOpen(true);
                  }}
                  icon={<Pencil className="h-4 w-4" aria-hidden="true" />}
                >
                  Editar
                </Button>
                <Button
                  type="button"
                  variant={item.isActive ? "danger" : "success"}
                  size="sm"
                  disabled={isMutating}
                  onClick={() => void handleToggleActive(item)}
                >
                  {item.isActive ? "Desactivar" : "Reactivar"}
                </Button>
              </div>
            )}
          />
        </DataTableContainer>
      )}

      <Modal isOpen={isFormOpen} onClose={closeForm} size="md">
        <ModalBody>
          <form
            onSubmit={formik.handleSubmit}
            noValidate
            className="space-y-5 p-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {editing ? "Editar módulo" : "Nuevo módulo"}
              </h3>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                {headquarterName}
              </p>
            </div>
            {error ? (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
              >
                {error}
              </p>
            ) : null}
            <Input
              name="code"
              label="Código"
              aria-label="Código del módulo"
              required
              maxLength={20}
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.code}
              error={formik.errors.code}
              helpText="Se guardará en mayúsculas. Máximo 20 caracteres."
            />
            <Input
              name="name"
              label="Nombre"
              aria-label="Nombre del módulo"
              required
              maxLength={100}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.name}
              error={formik.errors.name}
            />
            <Select
              name="moduleType"
              label="Tipo de atención"
              aria-label="Tipo de atención"
              required
              options={[
                { value: "GENERAL", label: "General" },
                { value: "PRIORITARIO", label: "Prioritario" },
              ]}
              value={formik.values.moduleType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.moduleType}
              error={formik.errors.moduleType}
              disabled={isMutating}
              placeholder="Selecciona un tipo"
            />
            <p className="text-sm text-slate-600 dark:text-gray-300">
              Un módulo general atiende exclusivamente turnos generales; uno
              prioritario, exclusivamente turnos prioritarios.
            </p>
            {editing ? (
              <p className="text-sm">
                Tipo vigente: {editing.isPriority ? "Prioritario" : "General"}
              </p>
            ) : null}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={closeForm}
                disabled={isMutating}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!formik.values.moduleType}
                isLoading={formik.isSubmitting || isMutating}
              >
                Guardar módulo
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </section>
  );
};

export default TurnoModulosSection;
