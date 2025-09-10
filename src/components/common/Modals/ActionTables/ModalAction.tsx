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
import { useLazyFetchMunicipio } from "@/hooks/useLazyFetchMunicipio";

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

const ModalAction: React.FC<ModalActionProps> = ({
  item,
  name,
  endPoint,
  onSuccess,
}) => {
  const [stadopen, setStadopen] = useState(false);

  const { loading, error, update } = useTableMutations();

  const { municipios, fetchMunicipios } = useLazyFetchMunicipio();

  // Función para abrir el modal y cargar datos solo cuando sea necesario
  const handleOpenModal = async () => {
    setStadopen(true);
    // Solo cargar datos si el modal es para "Lugar Radicacion"
    if (name === "Lugar Radicacion") {
      await Promise.all([
        fetchMunicipios(),
      ]);
    }
  };

  const validationSchema = useMemo(
    () =>
      Yup.object({
        id: Yup.number().required("El ID es requerido"),
        status: Yup.number().optional(),
        name: Yup.string()
          .optional()
          .min(2, "El nombre debe tener al menos 3 caracteres")
          .max(200, "El nombre debe tener como máximo 200 caracteres"),
        address: Yup.string().when("reference",{
          is: (value: string) => value === "Lugar Radicacion",
          then: (schema) => schema.required("La dirección es obligatoria"),
          otherwise: (schema) => schema.notRequired(),
        } ),
        city: Yup.string().when("reference",{
          is: (value: string) => value === "Lugar Radicacion",
          then: (schema) => schema.required("El municipio es obligatorio"),
          otherwise: (schema) => schema.notRequired(),
        } ),
        headquartersNumber: Yup.number().when("reference",{
          is: (value: string) => value === "Lugar Radicacion",
          then: (schema) => schema.min(1, "El número de sede debe ser al menos 1").required("El número de sede es obligatorio"),
          otherwise: (schema) => schema.notRequired(),
        } ),
      }),
    []
  );
  const formik = useFormik({
    initialValues: {
      id: item.id,
      status: item.status ? 1 : 0,
      name: item.name,
      address: (item as ILugarRadicacion).address || "",
      city: (item as ILugarRadicacion).cityId || "",
      reference: name,
      headquartersNumber: (item as ILugarRadicacion).headquartersNumber || 0
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
        onClick={handleOpenModal}
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
            {name === "Lugar Radicacion" && (
              <>
                <Input
                  label="Dirección"
                  type="text"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address && formik.errors.address
                      ? formik.errors.address
                      : undefined
                  }
                  touched={formik.touched.address}
                  required
                />
                <Select
                  label="Municipio"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={municipios.map((mun: IMunicipios) => ({
                    value: mun.id,
                    label: mun.name,
                  }))}
                  error={
                    formik.errors.city && formik.touched.city
                      ? formik.errors.city
                      : undefined
                  }
                  touched={formik.touched.city}
                  required
                />
                <Input
                  label="Número de Sede"
                  type="number"
                  id="headquartersNumber"
                  name="headquartersNumber"
                  value={formik.values.headquartersNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.headquartersNumber && formik.errors.headquartersNumber
                      ? formik.errors.headquartersNumber
                      : undefined
                  }
                  touched={formik.touched.headquartersNumber}
                  required
                />
              </>
            )}
          </section>
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
    </>
  );
};

export default ModalAction;
