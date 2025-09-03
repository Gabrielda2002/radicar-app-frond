//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState, useMemo } from "react";

//*Icons
import onOff from "/assets/on-off.svg";
import Button from "../../Ui/Button";
import FormModal from "../../Ui/FormModal";
import Input from "../../Ui/Input";
import Select from "../../Ui/Select";
import { IConvenios } from "@/models/IConvenios";
import { IMunicipios } from "@/models/IMunicipios";
import { IRadicador } from "@/models/IRadicador";
import { IServicios } from "@/models/IServicio";
import { IEspecialidad } from "@/models/IEspecialidad";
import { ILugarRadicacion } from "@/models/ILugarRadicado";
import { IIPSPrimaria } from "@/models/IIpsPrimaria";
import { IIPSRemite } from "@/models/IIpsRemite";
import { IDocumento } from "@/models/IDocumento";
import { useTableMutations } from "../CrearDataTables/Hook/useTablesMutations";
import { AnimatePresence } from "framer-motion";

// En el archivo ModalAction.tsx
type ModalActionItem =
  | IConvenios
  | IMunicipios
  | IRadicador
  | IServicios
  | IEspecialidad
  | ILugarRadicacion
  | IIPSPrimaria
  | IIPSRemite
  | IDocumento;
interface ModalActionProps {
  item: ModalActionItem;
  name: string;
  endPoint: string;
  onSuccess?: () => void;
}

const ModalAction: React.FC<ModalActionProps> = ({ item, name, endPoint, onSuccess }) => {
  const [stadopen, setStadopen] = useState(false);

  const { loading, error, update } = useTableMutations();

  const validationSchema = useMemo(
    () =>
      Yup.object({
        id: Yup.number().required("El ID es requerido"),
        status: Yup.number().optional(),
        name: Yup.string()
          .optional()
          .min(2, "El nombre debe tener al menos 3 caracteres")
          .max(200, "El nombre debe tener como máximo 200 caracteres"),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      id: item.id,
      status: item.status ? 1 : 0,
      name: item.name,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await update(values.id, values, endPoint, () => {
          setStadopen(false);
          formik.resetForm();
          if (onSuccess) {
            onSuccess();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setStadopen(true)}
        icon={
          <img className="dark:invert " src={onOff} alt="Configuraciones" />
        }
      />
      <FormModal
        isOpen={stadopen}
        onClose={() => setStadopen(false)}
        title={`Actualizar ${name}`}
        onSubmit={formik.handleSubmit}
        isSubmitting={formik.isSubmitting || loading}
        isValid={formik.isValid}
        submitText="Guardar"
        size="lg"
      >
        <div className="p-6 w-[430px] md:w-[900px]">
          <section className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex">
              <Input
                label={`ID ${name}`}
                type="text"
                id="id"
                name="id"
                value={formik.values.id}
                readOnly
                error={
                  formik.errors.id && formik.touched.id
                    ? formik.errors.id
                    : undefined
                }
                touched={formik.touched.id}
                required
              />
            </div>
            <div className="flex">
              <Select
                options={[
                  { value: 1, label: "Activo" },
                  { value: 0, label: "Inactivo" },
                ]}
                label="Estado"
                id=""
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.status && formik.errors.status
                    ? formik.errors.status
                    : undefined
                }
                touched={formik.touched.status}
              />
            </div>
            <div className="">
              <Input
                label="Nombre"
                type="text"
                id=""
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : undefined
                }
                touched={formik.touched.name}
                required
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
          </section>
        </div>
      </FormModal>
    </>
  );
};

export default ModalAction;
