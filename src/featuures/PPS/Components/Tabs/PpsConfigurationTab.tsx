import { useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { useStorePpsReportingEntity } from "@/featuures/PPS/store/useStorePpsReportingEntity";
import {
  IDENTIFICATION_TYPE_OPTIONS,
  MONTH_OPTIONS,
  YEAR_RELATION_OPTIONS,
  IDENTIFICATION_HINTS,
  DEFAULT_VALUES,
  toFormValues,
  validationSchema,
} from "./ppsConfigurationForm";
import type { PpsConfigurationFormValues } from "./ppsConfigurationForm";

const PpsConfigurationTab = () => {
  const {
    reportingEntity,
    isLoading,
    error,
    getReportingEntity,
    updateReportingEntity,
  } = useStorePpsReportingEntity();

  useEffect(() => {
    getReportingEntity();
  }, [getReportingEntity]);

  const formik = useFormik<PpsConfigurationFormValues>({
    initialValues: reportingEntity
      ? toFormValues(reportingEntity)
      : DEFAULT_VALUES,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await updateReportingEntity(values,
        () => {
          toast.success("Datos de la entidad guardados");
        }
      );
    },
  });

  if (isLoading && !reportingEntity) {
    return (
      <div className="p-6 text-sm text-gray-500 dark:text-gray-400">
        Cargando...
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* ── Datos de la entidad ── */}
      <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
          Datos de la entidad
        </h5>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Select
            label="Tipo de identificación"
            name="identificationType"
            value={formik.values.identificationType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.identificationType &&
              formik.errors.identificationType
                ? formik.errors.identificationType
                : undefined
            }
            touched={formik.touched.identificationType as boolean}
            required
            disabled={formik.isSubmitting}
            hidePlaceholder
            options={IDENTIFICATION_TYPE_OPTIONS}
          />
          <Input
            type="text"
            label="Número de identificación"
            name="identificationNumber"
            value={formik.values.identificationNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.identificationNumber &&
              formik.errors.identificationNumber
                ? formik.errors.identificationNumber
                : undefined
            }
            touched={formik.touched.identificationNumber as boolean}
            required
            disabled={formik.isSubmitting}
            placeholder="Ej: 900758573"
            helpText={
              IDENTIFICATION_HINTS[formik.values.identificationType]
            }
          />
          <Input
            type="text"
            label="Nombre de la entidad"
            name="entityName"
            value={formik.values.entityName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.entityName && formik.errors.entityName
                ? formik.errors.entityName
                : undefined
            }
            touched={formik.touched.entityName as boolean}
            disabled={formik.isSubmitting}
          />
        </div>
      </section>

      {/* ── Archivos ── */}
      <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
          Archivos
        </h5>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            type="text"
            label="Prefijo archivo de programación"
            name="programmingFilePrefix"
            value={formik.values.programmingFilePrefix}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.programmingFilePrefix &&
              formik.errors.programmingFilePrefix
                ? formik.errors.programmingFilePrefix
                : undefined
            }
            touched={formik.touched.programmingFilePrefix as boolean}
            required
            disabled={formik.isSubmitting}
            placeholder="PPS190PPPS"
          />
          <Input
            type="text"
            label="Prefijo archivo de seguimiento"
            name="monitoringFilePrefix"
            value={formik.values.monitoringFilePrefix}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.monitoringFilePrefix &&
              formik.errors.monitoringFilePrefix
                ? formik.errors.monitoringFilePrefix
                : undefined
            }
            touched={formik.touched.monitoringFilePrefix as boolean}
            required
            disabled={formik.isSubmitting}
            placeholder="PPS190SPPS"
          />
        </div>
      </section>

      {/* ── Plazos máximos de entrega ── */}
      <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h5 className="mb-1 text-xl font-semibold text-blue-500 dark:text-gray-200">
          Plazos máximos de entrega
        </h5>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Se muestran en las vigencias de Programación y Seguimiento.
        </p>

        <div className="space-y-6">
          <div>
            <h6 className="mb-3 font-semibold text-gray-700 dark:text-gray-200">
              Programación
            </h6>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Select
                label="Mes"
                name="programmingDueMonth"
                value={formik.values.programmingDueMonth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.programmingDueMonth &&
                  formik.errors.programmingDueMonth
                    ? formik.errors.programmingDueMonth
                    : undefined
                }
                touched={formik.touched.programmingDueMonth as boolean}
                required
                disabled={formik.isSubmitting}
                hidePlaceholder
                options={MONTH_OPTIONS}
              />
              <Input
                type="number"
                label="Día"
                name="programmingDueDay"
                value={formik.values.programmingDueDay}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.programmingDueDay &&
                  formik.errors.programmingDueDay
                    ? formik.errors.programmingDueDay
                    : undefined
                }
                touched={formik.touched.programmingDueDay as boolean}
                required
                disabled={formik.isSubmitting}
                min={1}
                max={31}
              />
              <Select
                label="Vigencia"
                name="programmingDueYear"
                value={formik.values.programmingDueYear}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.programmingDueYear &&
                  formik.errors.programmingDueYear
                    ? formik.errors.programmingDueYear
                    : undefined
                }
                touched={formik.touched.programmingDueYear as boolean}
                required
                disabled={formik.isSubmitting}
                hidePlaceholder
                options={YEAR_RELATION_OPTIONS}
              />
            </div>
          </div>

          <div>
            <h6 className="mb-3 font-semibold text-gray-700 dark:text-gray-200">
              Seguimiento
            </h6>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Select
                label="Mes"
                name="monitoringDueMonth"
                value={formik.values.monitoringDueMonth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.monitoringDueMonth &&
                  formik.errors.monitoringDueMonth
                    ? formik.errors.monitoringDueMonth
                    : undefined
                }
                touched={formik.touched.monitoringDueMonth as boolean}
                required
                disabled={formik.isSubmitting}
                hidePlaceholder
                options={MONTH_OPTIONS}
              />
              <Input
                type="number"
                label="Día"
                name="monitoringDueDay"
                value={formik.values.monitoringDueDay}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.monitoringDueDay &&
                  formik.errors.monitoringDueDay
                    ? formik.errors.monitoringDueDay
                    : undefined
                }
                touched={formik.touched.monitoringDueDay as boolean}
                required
                disabled={formik.isSubmitting}
                min={1}
                max={31}
              />
              <Select
                label="Vigencia"
                name="monitoringDueYear"
                value={formik.values.monitoringDueYear}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.monitoringDueYear &&
                  formik.errors.monitoringDueYear
                    ? formik.errors.monitoringDueYear
                    : undefined
                }
                touched={formik.touched.monitoringDueYear as boolean}
                required
                disabled={formik.isSubmitting}
                hidePlaceholder
                options={YEAR_RELATION_OPTIONS}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Modo estricto ── */}
      <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="strictMode"
            checked={formik.values.strictMode}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
            className="mt-1 h-5 w-5 rounded border-2 border-gray-300 text-color focus:ring-color2 dark:border-gray-600 dark:bg-gray-800"
          />
          <span>
            <span className="block text-base font-bold text-gray-700 dark:text-gray-200">
              Modo estricto
            </span>
            <span className="block text-sm text-gray-500 dark:text-gray-400">
              Obliga a que la programación use únicamente metas y actividades
              definidas en los catálogos.
            </span>
          </span>
        </label>
      </section>

      {error && (
        <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {reportingEntity && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Última actualización:{" "}
          {new Date(reportingEntity.updatedAt).toLocaleString("es-CO")}
        </p>
      )}

      <div className="flex items-center justify-end gap-3">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={<Save className="w-5 h-5" />}
          iconPosition="left"
          isLoading={isLoading}
          disabled={formik.isSubmitting}
        >
          Guardar datos de la entidad
        </Button>
      </div>
    </form>
  );
};

export default PpsConfigurationTab;
