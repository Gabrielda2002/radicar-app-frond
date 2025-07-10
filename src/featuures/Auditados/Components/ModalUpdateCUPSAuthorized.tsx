//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import { Cup } from "@/models/IAuditados";
import React, { useEffect, useState, useMemo } from "react";
import { useFetchStatus } from "@/hooks/UseFetchStatus";
//*Icons
import editar from "/assets/editar.svg";
import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { useCUPSAuthorized } from "../Hooks/UseCUPSAuthorized";
import { toast } from "react-toastify";
import Button from "@/components/common/Ui/Button";

interface ModalActualizarCupsAuditadosProps {
  cup: Cup;
}

const ModalActualizarCupsAuditoria: React.FC<
  ModalActualizarCupsAuditadosProps
> = ({ cup }) => {
  const [stadopen, setStadopen] = useState(false);

  const { UpdateCupsAuthorized, loading, error, refetch } = useCUPSAuthorized();

  // * se agreaga estado para el control de la carga de los estados
  const [loadEstados, setLoadEstados] = useState(false);
  // * el hook espera el loadEstados para cargar los estados, si es true carga los estados
  const { dataEstados, errorEstados } = useFetchStatus(loadEstados);

  // * se agrega un efecto para cargar los estados cuando stadopen sea true, es decir cuando el modal se abra
  useEffect(() => {
    if (stadopen) {
      setLoadEstados(true);
    }
  }, [stadopen]);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        estado: Yup.string().required("El estado es requerido."),
        observacion: Yup.string()
          .min(1, "La observación debe tener al menos 1 caracteres.")
          .max(500, "La observación no debe exceder los 500 caracteres.")
          .required("La observación es requerida."),
        quantity: Yup.number().required(
          "La cantidad de servicios es requerida."
        ),
      }),
    []
  );

  // hook de formik
  const formik = useFormik({
    initialValues: {
      estado: cup.status,
      observacion: cup.observation,
      quantity: cup.quantity,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("observation", values.observacion);
      formData.append("status", values.estado.toString());
      formData.append("quantity", values.quantity.toString());

      try {
        const response = await UpdateCupsAuthorized(cup.id, formData);

        if (response && response.status === 200) {
          toast.success("CUPS actualizado correctamente.");
          formik.resetForm();
          refetch(); 
        }
      } catch (error) {
        console.log(`Ocurrio un error al actualizar el CUPS: ${error}`);
      }
    },
  });

  if (errorEstados) return <h2>Error Al cargar Estados {errorEstados}</h2>;

  return (
    <>
      <Button variant="secondary" onClick={() => setStadopen(true)} size="sm">
        <img className="dark:invert" src={editar} alt="icon-editar" />
      </Button>
      <FormModal
        isOpen={stadopen}
        onClose={() => setStadopen(false)}
        title="Actualizar CUPS Auditados"
        size="lg"
        onSubmit={formik.handleSubmit}
        isValid={formik.isValid}
        isSubmitting={loading}
        submitText="Actualizar"
      >
        <div className="max-h-[70Vh] overflow-y-auto dark:bg-gray-800">
          <div className="p-5">
            {cup && (
              <section className="grid grid-cols-1 gap-10" key={cup.code}>
                <div className="grid grid-cols-2 gap-10">
                  <div className="grid grid-cols-2 gap-10">
                    {/* CUPS CODE */}
                    <div>
                      <Input
                        label="Código CUPS"
                        name=""
                        value={cup.code}
                        readOnly
                        className="w-full p-2 px-3 border border-gray-200 rounded dark-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                      />
                    </div>
                    {/* CUP STATE */}
                    <div className="">
                      <Select
                        options={[
                          ...dataEstados.map((estado) => ({
                            value: estado.id,
                            label: estado.name,
                          })),
                        ]}
                        label="Estado CUPS"
                        id="estado"
                        name="estado"
                        value={formik.values.estado}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        required
                        error={formik.errors.estado}
                        touched={formik.touched.estado}
                      />
                    </div>
                    <div>
                      <Input
                        label="Cantidad de Servicios"
                        type="text"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="quantity"
                        error={formik.errors.quantity}
                        touched={formik.touched.quantity}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      label="Descripción CUPS"
                      id=""
                      name=""
                      readOnly
                      value={cup.description}
                      className="w-full h-full p-2 px-3 border border-gray-200 rounded dark-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                    />
                  </div>
                </div>
                <div>
                  <Input
                    label="Observación"
                    type="text"
                    id="observacion"
                    name="observacion"
                    value={formik.values.observacion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.observacion}
                    touched={formik.touched.observacion}
                    required
                  />
                </div>
              </section>
            )}
          </div>
          {error && (
            <div className="flex items-center justify-center w-full p-2 text-sm font-semibold text-red-500 bg-red-100 border-2 border-red-500 rounded-md dark:bg-red-900 dark:text-red-200 dark:border-red-700">
              {error}
            </div>
          )}
        </div>
      </FormModal>
    </>
  );
};

export default ModalActualizarCupsAuditoria;
