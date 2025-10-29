import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UseMutationsPermission } from "../hook/useMutationsPermission";
import { AnimatePresence } from "framer-motion";

interface ModalRequestPermissionProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalRequestPermission = ({ isOpen, onClose }: ModalRequestPermissionProps) => {

  const {create, error, isLoading} = UseMutationsPermission();

  const validationSchema = Yup.object({
    category: Yup.string().required("Se requiere la categoría"),
    granularity: Yup.string().required("Se requiere la granularidad"),
    startDate: Yup.date()
      .when('granularity', {
        is: (granularity: string) => granularity === 'MULTI_DAY' || granularity === 'DAILY',
        then: (schema) => schema.required('Se requiere la fecha de inicio para permisos de varios días'),
        otherwise: (schema) => schema.optional(),
      }),
    endDate: Yup.date()
      .when('granularity', {
        is: (granularity: string) => granularity === "MULTI_DAY" || granularity === 'DAILY',
        then: (schema) => schema.required('Se requiere la fecha de fin para permisos de varios días'),
        otherwise: (schema) => schema.optional()
      }),
    startTime: Yup.string().when('granularity', {
      is: (granularity: string) => granularity === 'HOURLY',
      then: (schema) => schema.required('Se requiere la hora de inicio para permisos por horas'),
      otherwise: (schema) => schema.optional(),
    }),
    endTime: Yup.string().when('granularity', {
      is: (granularity: string) => granularity === 'HOURLY',
      then: (schema) => schema.required('Se requiere la hora de fin para permisos por horas'),
      otherwise: (schema) => schema.optional(),
    }),
    compensationTime: Yup.string(),
    nonRemunerated: Yup.boolean(),
    notes: Yup.string()
      .min(1, "Debe tener al menos 1 carácter")
      .max(1000, "No puede tener más de 1000 caracteres"),
    file: Yup.mixed().when('category', {
      is: (category: string) => category === 'INCAPACIDAD' || category === 'VACACIONES',
      then: (schema) => schema.required('Se requiere un archivo para este tipo de permiso'),
      otherwise: (schema) => schema.nullable()
    }),
  });

  const formik = useFormik({
    initialValues: {
      category: "",
      granularity: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      compensationTime: "",
      nonRemunerated: false,
      notes: "",
      file: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      await create(values, () => {
        formik.resetForm();
        onClose();
      });
    },
  });

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Solicitar Permiso"
      onSubmit={formik.handleSubmit}
      size="lg"
      isSubmitting={formik.isSubmitting || isLoading}
      isValid={formik.isValid}
      submitText="Solicitar"
    >
      <div>
        <div className="grid grid-cols-3 gap-4 py-3 px-5">
          <Select
            options={[
                { value: "PERMISO", label: "Permiso" },
                { value: "INCAPACIDAD", label: "Incapacidad" },
                { value: "CALAMIDAD", label: "Calamidad" },
                { value: "VACACIONES", label: "Vacaciones" }
            ]}
            label="Categoría"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.category && formik.errors.category ? formik.errors.category : undefined}
            touched={formik.touched.category}
            required
          />
          <Select
            options={[
                { value: "HOURLY", label: "Horas" },
                { value: "DAILY", label: "Días" },
                { value: "MULTI_DAY", label: "Varios Días" }
            ]}
            label="Granularidad"
            name="granularity"
            value={formik.values.granularity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.granularity && formik.errors.granularity ? formik.errors.granularity : undefined}
            touched={formik.touched.granularity}
            required
          />
          <Input
            label="Fecha de Inicio"
            name="startDate"
            type="date"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.startDate && formik.errors.startDate ? formik.errors.startDate : undefined}
            touched={formik.touched.startDate}
            required
          />
          <Input
            label="Fecha de Fin"
            name="endDate"
            type="date"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.endDate && formik.errors.endDate ? formik.errors.endDate : undefined}
            touched={formik.touched.endDate}
            required
          />
          <Input
            label="Hora de Inicio"
            name="startTime"
            type="time"
            value={formik.values.startTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.startTime && formik.errors.startTime ? formik.errors.startTime : undefined}
            touched={formik.touched.startTime}
            required
          />
          <Input
            label="Hora de Fin"
            name="endTime"
            type="time"
            value={formik.values.endTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.endTime && formik.errors.endTime ? formik.errors.endTime : undefined}
            touched={formik.touched.endTime}
            required
          />
          <Input
            label="Tiempo de Compensación"
            name="compensationTime"
            type="text"
            value={formik.values.compensationTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.compensationTime && formik.errors.compensationTime ? formik.errors.compensationTime : undefined}
            touched={formik.touched.compensationTime}
          />
          <Input
            label="No Remunerado"
            name="nonRemunerated"
            type="checkbox"
            checked={formik.values.nonRemunerated}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nonRemunerated && formik.errors.nonRemunerated ? formik.errors.nonRemunerated : undefined}
            touched={formik.touched.nonRemunerated}
          />
          <Input
            label="Notas"
            name="notes"
            type="textarea"
            value={formik.values.notes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.notes && formik.errors.notes ? formik.errors.notes : undefined}
            touched={formik.touched.notes}
          />
          <Input
            label="Adjuntar Archivo"
            name="file"
            type="file"
            onChange={(event) => {
              const file  = event.currentTarget.files ? event.currentTarget.files[0] : null;
              formik.setFieldValue("file", file);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.file && formik.errors.file ? formik.errors.file : undefined}
            touched={formik.touched.file}
            accept=".pdf"
          />
        </div>
        <AnimatePresence>
            {error && (
              <div>
                <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                  {error}
                </div>
              </div>
            )}
          </AnimatePresence>
      </div>
    </FormModal>
  );
};

export default ModalRequestPermission;
