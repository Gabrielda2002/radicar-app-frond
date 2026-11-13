import { AlertTriangle } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import type { ITurnoSedeConfigAdmin } from "@/models/ITurnoAdmin";
import { useStoreTurnoAdmin } from "../store/useStoreTurnoAdmin";
import TurnoLocationMap from "./TurnoLocationMap";

interface ITurnoSedeFormValues {
  slug: string;
  latitude: string;
  longitude: string;
  geoRadiusMeters: string;
  averageServiceMinutes: string;
  isEnabled: boolean;
}

interface TurnoSedeFormProps {
  headquarterId: number;
  headquarterName: string;
  initial: ITurnoSedeConfigAdmin | null;
  otherSedes: ITurnoSedeConfigAdmin[];
  onSaved: () => void;
  onCancel: () => void;
}

const sedeSchema = Yup.object({
  slug: Yup.string()
    .trim()
    .min(2, "El slug debe tener al menos 2 caracteres")
    .max(100, "El slug debe tener máximo 100 caracteres")
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Usa solo letras minúsculas, números y guiones",
    )
    .required("El slug es requerido"),
  latitude: Yup.number()
    .typeError("Ingresa un número válido")
    .min(-90, "La latitud debe estar entre -90 y 90")
    .max(90, "La latitud debe estar entre -90 y 90")
    .required("La latitud es requerida"),
  longitude: Yup.number()
    .typeError("Ingresa un número válido")
    .min(-180, "La longitud debe estar entre -180 y 180")
    .max(180, "La longitud debe estar entre -180 y 180")
    .required("La longitud es requerida"),
  geoRadiusMeters: Yup.number()
    .typeError("Ingresa un número válido")
    .integer("El radio debe ser un número entero")
    .min(10, "El radio debe ser de al menos 10 metros")
    .required("El radio es requerido"),
  averageServiceMinutes: Yup.number()
    .typeError("Ingresa un número válido")
    .integer("El tiempo promedio debe ser un número entero")
    .min(1, "El tiempo promedio debe ser de al menos 1 minuto")
    .required("El tiempo promedio es requerido"),
});

const TurnoSedeForm = ({
  headquarterId,
  headquarterName,
  initial,
  otherSedes,
  onSaved,
  onCancel,
}: TurnoSedeFormProps) => {
  const saveSede = useStoreTurnoAdmin((state) => state.saveSede);
  const loadSedes = useStoreTurnoAdmin((state) => state.loadSedes);

  const formik = useFormik<ITurnoSedeFormValues>({
    enableReinitialize: true,
    initialValues: {
      slug: initial?.slug ?? "",
      latitude: initial ? String(initial.latitude) : "",
      longitude: initial ? String(initial.longitude) : "",
      geoRadiusMeters: initial ? String(initial.geoRadiusMeters) : "150",
      averageServiceMinutes: initial
        ? String(initial.averageServiceMinutes)
        : "10",
      isEnabled: initial ? initial.isEnabled : true,
    },
    validationSchema: sedeSchema,
    onSubmit: async (values, helpers) => {
      const slug = values.slug.trim().toLowerCase();
      const conflict = otherSedes.find(
        (sede) => sede.slug.trim().toLowerCase() === slug,
      );
      if (conflict) {
        helpers.setFieldError(
          "slug",
          `Este slug ya lo usa la sede ${conflict.headquarterName}`,
        );
        return;
      }
      const result = await saveSede({
        headquarterId,
        slug,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
        geoRadiusMeters: Number(values.geoRadiusMeters),
        isEnabled: values.isEnabled,
        averageServiceMinutes: Number(values.averageServiceMinutes),
      });
      if (!result.ok) {
        toast.error(
          result.message ?? "No se pudo guardar la configuración de la sede.",
        );
        return;
      }
      toast.success("Configuración de la sede guardada");
      await loadSedes();
      onSaved();
    },
  });

  const normalizedSlug = formik.values.slug.trim().toLowerCase();
  const conflictingSede = otherSedes.find(
    (sede) => sede.slug.trim().toLowerCase() === normalizedSlug,
  );
  const slugChanged =
    initial !== null &&
    normalizedSlug.length > 0 &&
    normalizedSlug !== initial.slug.trim().toLowerCase();

  const handleLocationChange = (latitude: string, longitude: string) => {
    void formik.setFieldValue("latitude", latitude);
    void formik.setFieldValue("longitude", longitude);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className="space-y-6 rounded-xl border border-slate-200 p-5 dark:border-gray-700"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {initial ? "Editar sede" : "Nueva sede"}
        </h3>
        <p className="text-sm text-slate-500 dark:text-gray-400">
          {headquarterName}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Input
              name="slug"
              label="Slug de la sede"
              aria-label="Slug de la sede"
              required
              placeholder="casa-gabriel-07"
              value={formik.values.slug}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.slug}
              error={formik.errors.slug}
              helpText="Se usa en los enlaces públicos de la sede."
            />
            {slugChanged ? (
              <p
                role="status"
                className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-300"
              >
                <AlertTriangle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                Al guardar, los enlaces anteriores dejarán de funcionar.
              </p>
            ) : null}
            {conflictingSede ? (
              <p
                role="alert"
                className="text-sm text-red-700 dark:text-red-300"
              >
                Este slug ya lo usa la sede {conflictingSede.headquarterName}.
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              name="latitude"
              label="Latitud"
              aria-label="Latitud"
              required
              inputMode="decimal"
              value={formik.values.latitude}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.latitude}
              error={formik.errors.latitude}
            />
            <Input
              name="longitude"
              label="Longitud"
              aria-label="Longitud"
              required
              inputMode="decimal"
              value={formik.values.longitude}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.longitude}
              error={formik.errors.longitude}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              name="geoRadiusMeters"
              label="Radio permitido (metros)"
              aria-label="Radio permitido en metros"
              required
              inputMode="numeric"
              value={formik.values.geoRadiusMeters}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.geoRadiusMeters}
              error={formik.errors.geoRadiusMeters}
              helpText="Distancia máxima para solicitar el turno."
            />
            <Input
              name="averageServiceMinutes"
              label="Tiempo promedio (minutos)"
              aria-label="Tiempo promedio de servicio en minutos"
              required
              inputMode="numeric"
              value={formik.values.averageServiceMinutes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.averageServiceMinutes}
              error={formik.errors.averageServiceMinutes}
              helpText="Estimado que verá el paciente."
            />
          </div>

          <Input
            name="isEnabled"
            type="checkbox"
            variant="checkbox"
            label="Sede habilitada para turnos"
            checked={formik.values.isEnabled}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <TurnoLocationMap
          latitude={formik.values.latitude}
          longitude={formik.values.longitude}
          radiusMeters={Number(formik.values.geoRadiusMeters) || 0}
          onLocationChange={handleLocationChange}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={formik.isSubmitting}>
          Guardar configuración
        </Button>
      </div>
    </form>
  );
};

export default TurnoSedeForm;
