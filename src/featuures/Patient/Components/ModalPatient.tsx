//*Funciones y Hooks
import React, { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IPacientes } from "@/models/IPacientes";

//*Icons
import {
  IdentificationIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/common/Ui/Button";
import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { Pencil, PlusCircleIcon, Smartphone } from "lucide-react";
import { usePatient } from "../Hooks/usePatient";
import { AnimatePresence } from "framer-motion";
import { useLazyFetchConvenio } from "@/hooks/useLazyFetchConvenio";
import { useLazyFetchTypeDocument } from "@/hooks/useLazyFetchTypeDocument";
import { useLazyFetchIpsPrimary } from "@/hooks/useLazyFetchIpsPrimary";

interface ModalPatientProps {
  id: number | null;
  paciente: IPacientes | null;
}

const ModalPatient: React.FC<ModalPatientProps> = ({
  id,
  paciente,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { createPatient, updatePatient, error, loading } = usePatient();

  //hook para traer los tipos de documentos
  const { dataDocument, errorDocument, fetchDocument } = useLazyFetchTypeDocument();

  // hook para traer los convenios
  const { dataConvenios, errorConvenio, fetchConvenios } = useLazyFetchConvenio();

  // hook para traer  las ips primarias
  const { dataIpsPrimaria, errorIpsPrimaria, fetchIpsPrimaria } = useLazyFetchIpsPrimary();

const handleModalOpen = async () => {
    setIsOpen(true);
    await Promise.all([fetchConvenios(), fetchDocument(), fetchIpsPrimaria()]);
}

  const validationSchema = useMemo(
    () =>
      Yup.object({
        tipoDocumento: Yup.string().required(
          "El tipo de documento es obligatorio"
        ),
        correo: Yup.string().required("El correo es obligatorio"),
        identificacion: Yup.string()
          .required("La identificación es obligatoria")
          .min(5, "La identificación debe tener al menos 5 caracteres")
          .max(16, "La identificación debe tener como máximo 16 caracteres"),
        telefonoFijo: Yup.string()
          .required("El teléfono fijo es obligatorio")
          .min(1, "El teléfono fijo debe tener al menos 1 caracter")
          .max(10, "El teléfono fijo debe tener como máximo 10 caracteres"),
        nombreCompleto: Yup.string()
          .required("El nombre completo es obligatorio")
          .min(3, "El nombre completo debe tener al menos 3 caracteres")
          .max(100, "El nombre completo debe tener como máximo 100 caracteres"),
        convenio: Yup.string().required("El convenio es obligatorio"),
        numeroCelular: Yup.string()
          .required("El número de celular es obligatorio")
          .min(1, "El número de celular debe tener al menos 1 caracter")
          .max(10, "El número de celular debe tener como máximo 10 caracteres"),
        numeroCelular2: Yup.string()
          .optional()
          .min(1, "El número de celular debe tener al menos 1 caracter")
          .max(10, "El número de celular debe tener como máximo 10 caracteres"),
        ipsPrimaria: Yup.string().required("La IPS primaria es obligatoria"),
        direccion: Yup.string().required("La dirección es obligatoria"),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      tipoDocumento: "",
      correo: "",
      identificacion: "",
      telefonoFijo: "",
      nombreCompleto: "",
      convenio: "",
      numeroCelular: "",
      numeroCelular2: "",
      ipsPrimaria: "",
      direccion: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("documentType", values.tipoDocumento);
        formData.append("email", values.correo);
        formData.append("documentNumber", values.identificacion);
        formData.append("landline", values.telefonoFijo);
        formData.append("name", values.nombreCompleto);
        formData.append("convenio", values.convenio);
        formData.append("phoneNumber", values.numeroCelular);
        formData.append("phoneNumber2", values.numeroCelular2);
        formData.append("ipsPrimaria", values.ipsPrimaria);
        formData.append("address", values.direccion);

        let response;

        if (id) {
          response = await updatePatient(formData, id);
        } else {
          response = await createPatient(formData);
        }

        if (response?.status === 200 || response?.status === 201) {
            setIsOpen(false);
            formik.resetForm();
        }
      } catch (error) {
        console.error("Error al crear o actualizar el paciente:", error);
      }
    },
  });
  useEffect(() => {
    if (id !== null && paciente) {
      formik.setValues({
        tipoDocumento: paciente.documentRelation.id.toString(),
        correo: paciente.email,
        identificacion: paciente.documentNumber.toString(),
        telefonoFijo: paciente.landline,
        nombreCompleto: paciente.name,
        convenio: paciente.convenioRelation.id.toString(),
        numeroCelular: paciente.phoneNumber,
        numeroCelular2: paciente.phoneNumber2 ?? "",
        ipsPrimaria: paciente.ipsPrimariaRelation.id.toString(),
        direccion: paciente.address,
      });
    }
  }, [id, paciente]);

  if (errorDocument) return <p>{errorDocument}</p>;
  if (errorConvenio) return <p>{errorConvenio}</p>;
  if (errorIpsPrimaria) return <p>{errorIpsPrimaria}</p>;

  return (
    <>
      <Button
        variant="primary"
        type="button"
        onClick={handleModalOpen}
        icon={id !== null ? <Pencil className="w-5 h-5" /> : <PlusCircleIcon className="w-5 h-5" />}
      >
        {id !== null ? "Editar" : "Crear Paciente"}
      </Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Modal ${id !== null ? "Editar" : "Crear"} Paciente`}
        onSubmit={formik.handleSubmit}
        isSubmitting={loading}
        size="lg"
        isValid={formik.isValid}
        submitText={id !== null ? "Actualizar" : "Crear"}
      >
        <div className="px-5 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 gap-6 p-2 mt-2 mb-2 md:grid-cols-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Select
                  label="Tipo documento"
                  name="tipoDocumento"
                  value={formik.values.tipoDocumento}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={dataDocument.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  error={formik.errors.tipoDocumento}
                  touched={formik.touched.tipoDocumento}
                  required
                />
              </div>

              <div>
                <Input
                  label="Número documento"
                  name="identificacion"
                  value={formik.values.identificacion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                  placeholder="Ingrese Identificación..."
                  error={formik.errors.identificacion}
                  touched={formik.touched.identificacion}
                  required
                  icon={<IdentificationIcon className="w-5 h-5" />}
                />
              </div>
            </div>

            <div>
              <Input
                label="Nombre completo"
                type="text"
                name="nombreCompleto"
                value={formik.values.nombreCompleto}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ingrese Nombre Completo..."
                error={formik.errors.nombreCompleto}
                touched={formik.touched.nombreCompleto}
                icon={<UserCircleIcon className="w-5 h-5" />}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 p-2 md:grid-cols-2">
            <div>
              <Input
                label="Teléfono Fijo"
                name="telefonoFijo"
                value={formik.values.telefonoFijo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                placeholder="Ingrese Teléfono Fijo..."
                error={formik.errors.telefonoFijo}
                touched={formik.touched.telefonoFijo}
                icon={<PhoneIcon className="w-5 h-5" />}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Input
                  label="Número de Celular"
                  type="text"
                  name="numeroCelular"
                  value={formik.values.numeroCelular}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingrese Número..."
                  error={formik.errors.numeroCelular}
                  touched={formik.touched.numeroCelular}
                  icon={<Smartphone className="w-5 h-5" />}
                  required
                />
              </div>

              <div>
                <Input
                  label="Número de Celular 2"
                  type="text"
                  name="numeroCelular2"
                  value={formik.values.numeroCelular2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingrese Número..."
                  error={formik.errors.numeroCelular2}
                  touched={formik.touched.numeroCelular2}
                  icon={<Smartphone className="w-5 h-5" />}
                />
              </div>
            </div>
          </div>

          {/* Segunda parte del formulario */}
          <div className="grid grid-cols-1 p-2 mb-4 md:grid-cols-2 gap-x-10">
            <div>
              <Input
                label="Dirección"
                type="text"
                name="direccion"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ingrese Direccion..."
                error={formik.errors.direccion}
                touched={formik.touched.direccion}
                icon={<MapPinIcon className="w-5 h-5" />}
                required
              />
            </div>

            <div>
              <Input
                label="Correo Electrónico"
                type="email"
                placeholder="Ingresa Correo..."
                name="correo"
                value={formik.values.correo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.correo}
                touched={formik.touched.correo}
                icon={<EnvelopeIcon className="w-5 h-5" />}
                required
              />
            </div>

            <div>
              <Select
                label="IPS Primaria"
                name="ipsPrimaria"
                value={formik.values.ipsPrimaria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={dataIpsPrimaria.map((ips) => ({
                  value: ips.id,
                  label: ips.name,
                }))}
                error={formik.errors.ipsPrimaria}
                touched={formik.touched.ipsPrimaria}
                required
              />
            </div>

            <div>
              <Select
                label="Convenio"
                name="convenio"
                value={formik.values.convenio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={dataConvenios.map((convenio) => ({
                  value: convenio.id,
                  label: convenio.name,
                }))}
                error={formik.errors.convenio}
                touched={formik.touched.convenio}
                required
              />
            </div>
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
    </>
  );
};
export default ModalPatient;
