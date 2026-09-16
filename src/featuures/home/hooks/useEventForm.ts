import { useFormik } from "formik";
import { toast } from "react-toastify";
import { IEventos } from "@/models/IEventos";
import { IEventFormValues } from "@/models/IEventFormValues";
import { useStoreEvent } from "../store/useStoreEvent";
import { extractFechaHora, getDuracionLegible } from "../utils/eventDates";
import { eventValidationSchema } from "../utils/eventValidationSchema";

interface UseEventFormParams {
  initialData?: IEventos;
  onSuccess: () => void;
}

export const useEventForm = ({ initialData, onSuccess }: UseEventFormParams) => {
  const { create, update } = useStoreEvent();
  const isEditing = Boolean(initialData);

  const startValues = initialData?.dateStart ? extractFechaHora(initialData.dateStart) : { fecha: "", hora: "" };
  const endValues = initialData?.dateEnd ? extractFechaHora(initialData.dateEnd) : { fecha: "", hora: "" };

  const formik = useFormik<IEventFormValues>({
    initialValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      place: initialData?.place || "",
    //   responsableNombre: initialData?.responsibleName || "",
      dateStart: startValues.fecha,
      dateEnd: endValues.fecha,
      timeStart: initialData?.timeStart || startValues.hora,
      timeEnd: initialData?.timeEnd || endValues.hora,
      color: initialData?.color || "#008d93",
    },
    validationSchema: eventValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {

      const handleSuccess = () => {
        toast.success(isEditing ? "Evento actualizado exitosamente" : "Evento creado exitosamente");
        formik.resetForm();
        onSuccess();
      };

      if (initialData) await update(initialData.id, values, handleSuccess);
      else await create(values, handleSuccess);
    },
  });

  const fieldProps = (name: keyof IEventFormValues) => ({
    name,
    value: formik.values[name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: formik.errors[name],
    touched: formik.touched[name],
    size: "full" as const,
    requiredClassName: "text-gray-700 dark:text-gray-200",
    errorClassName: "text-gray-700 dark:text-gray-200",
  });

  const duracion = getDuracionLegible(
    formik.values.dateStart,
    formik.values.timeStart,
    formik.values.dateEnd,
    formik.values.timeEnd,
  );

  return { formik, isEditing, fieldProps, duracion };
};
