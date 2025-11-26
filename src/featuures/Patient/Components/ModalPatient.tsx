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
import { usePatientMutations } from "../Hooks/usePatientMutations";
import { AnimatePresence } from "framer-motion";
import { useLazyFetchConvenio } from "@/hooks/useLazyFetchConvenio";
import { useLazyFetchTypeDocument } from "@/hooks/useLazyFetchTypeDocument";
import { useLazyFetchIpsPrimary } from "@/hooks/useLazyFetchIpsPrimary";
import { toast } from "react-toastify";

interface ModalPatientProps {
  id: number | null;
  paciente: IPacientes | null;
  onSuccess?: () => void;
}

const ModalPatient: React.FC<ModalPatientProps> = ({
  id,
  paciente,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { createPatient, updatePatient, error, loading } = usePatientMutations();

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
        documentType: Yup.string().required(
          "El tipo de documento es obligatorio"
        ),
        email: Yup.string().required("El email es obligatorio"),
        documentNumber: Yup.string()
          .required("La identificación es obligatoria")
          .min(5, "La identificación debe tener al menos 5 caracteres")
          .max(16, "La identificación debe tener como máximo 16 caracteres"),
        landline: Yup.string()
          .required("El teléfono fijo es obligatorio")
          .min(1, "El teléfono fijo debe tener al menos 1 caracter")
          .max(10, "El teléfono fijo debe tener como máximo 10 caracteres"),
        name: Yup.string()
          .required("El nombre completo es obligatorio")
          .min(3, "El nombre completo debe tener al menos 3 caracteres")
          .max(100, "El nombre completo debe tener como máximo 100 caracteres"),
        agreement: Yup.string().required("El convenio es obligatorio"),
        phoneNumber: Yup.string()
          .required("El número de celular es obligatorio")
          .min(1, "El número de celular debe tener al menos 1 caracter")
          .max(10, "El número de celular debe tener como máximo 10 caracteres"),
        phoneNumber2: Yup.string()
          .optional()
          .min(1, "El número de celular debe tener al menos 1 caracter")
          .max(10, "El número de celular debe tener como máximo 10 caracteres"),
        ipsPrimaria: Yup.string().required("La IPS primaria es obligatoria"),
        address: Yup.string().required("La dirección es obligatoria"),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      documentType: "",
      email: "",
      documentNumber: "",
      landline: "",
      name: "",
      agreement: "",
      phoneNumber: "",
      phoneNumber2: "",
      ipsPrimaria: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      if (id !== null) {
        await updatePatient(values, id, () => {
          setIsOpen(false);
          onSuccess?.();
          toast.success("Paciente actualizado exitosamente");
          formik.resetForm();
        });
      }else {
        await createPatient(values, () => {
          setIsOpen(false);
          onSuccess?.();
          toast.success("Paciente creado exitosamente");
          formik.resetForm();
        });
      }
    },
  });

  useEffect(() => {
    if (id !== null && paciente) {
      formik.setValues({
        documentType: paciente.documentRelation.id.toString(),
        email: paciente.email,
        documentNumber: paciente.documentNumber.toString(),
        landline: paciente.landline,
        name: paciente.name,
        agreement: paciente.convenioRelation.id.toString(),
        phoneNumber: paciente.phoneNumber,
        phoneNumber2: paciente.phoneNumber2 ?? "",
        ipsPrimaria: paciente.ipsPrimariaRelation.id.toString(),
        address: paciente.address,
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
                  name="documentType"
                  value={formik.values.documentType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={dataDocument.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  error={formik.errors.documentType}
                  touched={formik.touched.documentType}
                  required
                />
              </div>

              <div>
                <Input
                  label="Número documento"
                  name="documentNumber"
                  value={formik.values.documentNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                  placeholder="Ingrese Identificación..."
                  error={formik.errors.documentNumber}
                  touched={formik.touched.documentNumber}
                  required
                  icon={<IdentificationIcon className="w-5 h-5" />}
                />
              </div>
            </div>

            <div>
              <Input
                label="Nombre completo"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ingrese Nombre Completo..."
                error={formik.errors.name}
                touched={formik.touched.name}
                icon={<UserCircleIcon className="w-5 h-5" />}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 p-2 md:grid-cols-2">
            <div>
              <Input
                label="Teléfono Fijo"
                name="landline"
                value={formik.values.landline}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                placeholder="Ingrese Teléfono Fijo..."
                error={formik.errors.landline}
                touched={formik.touched.landline}
                icon={<PhoneIcon className="w-5 h-5" />}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Input
                  label="Número de Celular"
                  type="text"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingrese Número..."
                  error={formik.errors.phoneNumber}
                  touched={formik.touched.phoneNumber}
                  icon={<Smartphone className="w-5 h-5" />}
                  required
                />
              </div>

              <div>
                <Input
                  label="Número de Celular 2"
                  type="text"
                  name="phoneNumber2"
                  value={formik.values.phoneNumber2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingrese Número..."
                  error={formik.errors.phoneNumber2}
                  touched={formik.touched.phoneNumber2}
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
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ingrese Direccion..."
                error={formik.errors.address}
                touched={formik.touched.address}
                icon={<MapPinIcon className="w-5 h-5" />}
                required
              />
            </div>

            <div>
              <Input
                label="Correo Electrónico"
                type="email"
                placeholder="Ingresa Correo..."
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.email}
                touched={formik.touched.email}
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
                name="agreement"
                value={formik.values.agreement}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={dataConvenios.map((agreement) => ({
                  value: agreement.id,
                  label: agreement.name,
                }))}
                error={formik.errors.agreement}
                touched={formik.touched.agreement}
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
