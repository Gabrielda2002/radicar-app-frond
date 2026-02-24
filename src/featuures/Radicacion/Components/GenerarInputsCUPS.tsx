import React, { useEffect, useRef } from "react";
import useFetchCups from "@/hooks/useFetchCups";
import Input from "@/components/common/Ui/Input";
import { FormikProps } from "formik";

interface CupsItem {
  code: string;
  description: string;
  quantity: string;
  id: string;
}

interface ServicioFormProps {
  formik: FormikProps<any>; // Recibe el objeto formik completo
}

const GenerarInputsCUPS: React.FC<ServicioFormProps> = ({ formik }) => {
  const { data, fetchCups, error, loading } = useFetchCups();
  const lastIndexRef = useRef<number | null>(null);

  // Cuando lleguen los datos del API, actualizar el campo correspondiente
  useEffect(() => {
    if (data && data.name && lastIndexRef.current !== null) {
      const index = lastIndexRef.current;
      const currentCup = formik.values.cupsData[index];

      // Solo actualizar si cambió
      if (currentCup.description !== data.name || currentCup.id !== String(data.id ?? "")) {
        formik.setFieldValue(`cupsData[${index}].description`, data.name);
        formik.setFieldValue(`cupsData[${index}].id`, String(data.id ?? ""));
      }
    }
  }, [data]);

  const handleServicioBlur = async (index: number) => {
    const codigoServicio = formik.values.cupsData[index]?.code;
    if (codigoServicio) {
      lastIndexRef.current = index;
      await fetchCups(codigoServicio);
    }
  };

  const bloques = formik.values.cupsData.map((_: CupsItem, index: number) => {
    // Type guards para evitar errores de TypeScript
    const touchedCup = Array.isArray(formik.touched.cupsData) ? formik.touched.cupsData[index] : undefined;
    const errorCup = Array.isArray(formik.errors.cupsData) ? formik.errors.cupsData[index] : undefined;
    
    // Type assertions para los errores específicos
    const codeError = touchedCup?.code && errorCup && typeof errorCup === 'object' ? (errorCup as any).code : undefined;
    const quantityError = touchedCup?.quantity && errorCup && typeof errorCup === 'object' ? (errorCup as any).quantity : undefined;
    const descriptionError = touchedCup?.description && errorCup && typeof errorCup === 'object' ? (errorCup as any).description : undefined;

    return (
      <React.Fragment key={index}>
        <div>
          <Input
            label={`Código Servicio N° ${index + 1}`}
            id={`cupsData[${index}].code`}
            name={`cupsData[${index}].code`}
            value={formik.values.cupsData[index]?.code || ""}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleServicioBlur(index);
            }}
            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
            placeholder="Código"
          />
          {codeError && (
            <div className="text-red-500 text-sm mt-1">
              {codeError}
            </div>
          )}
        </div>
        <div>
          <Input
            label={`Cantidad Servicio N° ${index + 1}`}
            id={`cupsData[${index}].quantity`}
            name={`cupsData[${index}].quantity`}
            maxLength={2}
            value={formik.values.cupsData[index]?.quantity || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
            placeholder="Cantidad"
            error={quantityError}
          />
          {quantityError && (
            <div className="text-red-500 text-sm mt-1">
              {quantityError}
            </div>
          )}
        </div>
        <div>
          <Input
            label={`Descripción Servicio N° ${index + 1}`}
            id={`cupsData[${index}].description`}
            name={`cupsData[${index}].description`}
            value={
              formik.values.cupsData[index]?.description || 
              (loading && lastIndexRef.current === index ? "Cargando..." : error || "")
            }
            className="w-full px-3 py-2 text-gray-400 border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-800"
            placeholder="Descripción"
            readOnly
            error={descriptionError}
          />
          {descriptionError && (
            <div className="text-red-500 text-sm mt-1">
              {descriptionError}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  });

  return <>{bloques}</>;
};

export default GenerarInputsCUPS;