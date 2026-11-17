import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import { useStoreTurnoAdmin } from "../store/useStoreTurnoAdmin";

interface TurnoSedeServiciosSectionProps {
  headquarterId: number;
  headquarterName: string;
}

const TurnoSedeServiciosSection = ({
  headquarterId,
  headquarterName,
}: TurnoSedeServiciosSectionProps) => {
  const data = useStoreTurnoAdmin((s) => s.data.servicesBySede[headquarterId]);
  const isLoading = useStoreTurnoAdmin((s) => s.servicesLoading[headquarterId]);
  const isSaving = useStoreTurnoAdmin((s) => s.servicesSaving[headquarterId]);
  const error = useStoreTurnoAdmin((s) => s.servicesError[headquarterId]);
  const loadServices = useStoreTurnoAdmin((s) => s.loadServices);
  const saveServices = useStoreTurnoAdmin((s) => s.saveServices);
  useEffect(() => {
    void loadServices(headquarterId);
  }, [headquarterId, loadServices]);

  const formik = useFormik<{ serviceIds: number[] }>({
    enableReinitialize: true,
    initialValues: { serviceIds: data?.assignedServiceIds ?? [] },
    validationSchema: Yup.object({
      serviceIds: Yup.array()
        .of(Yup.number().integer().positive().required())
        .required(),
    }),
    onSubmit: async ({ serviceIds }) => {
      const result = await saveServices(headquarterId, serviceIds);
      if (result.ok) toast.success("Servicios de la sede guardados.");
      else
        toast.error(result.message ?? "No se pudieron guardar los servicios.");
    },
  });
  const busy = isLoading || isSaving || formik.isSubmitting;
  const inactiveIds =
    data?.assignedServiceIds.filter(
      (id) => !data.services.some((service) => service.id === id),
    ) ?? [];
  const toggle = (id: number) =>
    void formik.setFieldValue(
      "serviceIds",
      formik.values.serviceIds.includes(id)
        ? formik.values.serviceIds.filter((value) => value !== id)
        : [...formik.values.serviceIds, id],
    );

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 p-5 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        Servicios de turnos · {headquarterName}
      </h3>
      {error ? (
        <div role="alert" className="space-y-2 text-red-700 dark:text-red-300">
          <p>{error}</p>
          <Button
            type="button"
            variant="outline"
            disabled={busy}
            onClick={() => void loadServices(headquarterId)}
          >
            Reintentar consulta
          </Button>
        </div>
      ) : null}
      {isLoading || (!data && !error) ? (
        <p role="status">Cargando servicios de la sede…</p>
      ) : null}
      {data ? (
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4"
          aria-busy={busy}
        >
          <p className="text-sm text-slate-600 dark:text-gray-300">
            Configuración vigente:{" "}
            {data.assignedServiceIds.length === 0
              ? "sin asignaciones. Configura manualmente los servicios para permitir nuevas solicitudes."
              : `${data.services
                .filter((service) => service.isAssigned)
                .map((service) => service.name)
                .join(
                  ", ",
                )}${inactiveIds.length ? ` · ${inactiveIds.length} asignaciones inactivas` : ""}`}
          </p>
          <fieldset disabled={busy} className="space-y-2">
            <legend className="mb-2 font-medium">Selección para guardar</legend>
            {data.services.length === 0 ? (
              <p>No hay servicios activos disponibles para asignar.</p>
            ) : null}
            {data.services.map((service) => (
              <label key={service.id} className="flex items-center gap-3 p-2">
                <Input
                  type="checkbox"
                  variant="checkbox"
                  checked={formik.values.serviceIds.includes(service.id)}
                  onChange={() => toggle(service.id)}
                />
                {service.name} ·{" "}
                {service.isAssigned ? "Asignado actualmente" : "No asignado"}
              </label>
            ))}
            {inactiveIds.map((id) => (
              <label key={id} className="flex items-center gap-3 p-2">
                <Input
                  type="checkbox"
                  variant="checkbox"
                  checked={formik.values.serviceIds.includes(id)}
                  onChange={() => toggle(id)}
                />
                Servicio #{id} · asignado, fuera del catálogo activo (retíralo
                para guardar)
              </label>
            ))}
          </fieldset>
          <p className="text-sm text-slate-500 dark:text-gray-400">
            Los cambios de selección solo serán vigentes después de guardar. Una
            selección vacía retira todas las asignaciones.
          </p>
          <Button
            type="submit"
            isLoading={isSaving || formik.isSubmitting}
            disabled={busy}
          >
            Guardar servicios
          </Button>
        </form>
      ) : null}
    </section>
  );
};

export default TurnoSedeServiciosSection;
