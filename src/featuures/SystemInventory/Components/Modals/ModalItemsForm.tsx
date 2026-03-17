//*Funciones y Hooks
import * as Yup from "yup";
import { AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import { IItems } from "@/models/IItems";
import React, { useEffect, useState } from "react";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import Input from "@/components/common/Ui/Input";

//*Icons
import {
  TagIcon,
  GlobeAltIcon,
  CalendarIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  LockClosedIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  FingerPrintIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { FormatDate } from "@/utils/FormatDate";
import FormModal from "@/components/common/Ui/FormModal";
import { IoDocumentTextOutline } from "react-icons/io5";
import Select from "@/components/common/Ui/Select";
import { useStoreEquipments } from "../../Store/useStoreEquipments";

interface ModalItemsFormProps {
  idSede: number | null;
  items: IItems | null;
  idItem: number | null;
  onSuccess: () => void;
}

const ModalItemsForm: React.FC<ModalItemsFormProps> = ({
  idSede,
  items,
  idItem,
  onSuccess,
}) => {
  const [stadopen, setStadopen] = useState(false);

  const { createEquipment, updateEquipment, error, isLoading } = useStoreEquipments();

  const validationSchema = {
    name: Yup.string()
      .required("El nombre es requerido")
      .min(2, "El nombre debe tener al menos 3 caracteres")
      .max(100, "El nombre debe tener como máximo 200 caracteres"),
    brand: Yup.string()
      .required("La marca es requerida")
      .min(2, "La marca debe tener al menos 3 caracteres")
      .max(200, "La marca debe tener como máximo 200 caracteres"),
    model: Yup.string()
      .required("El modelo es requerido")
      .min(3, "El modelo debe tener al menos 3 caracteres")
      .max(200, "El modelo debe tener como máximo 200 caracteres"),
    serial: Yup.string()
      .required("El serial es requerido")
      .min(3, "El serial debe tener al menos 3 caracteres")
      .max(200, "El serial debe tener como máximo 200 caracteres"),
    dhcp: Yup.boolean().optional(),
    addressIp: Yup.string().when("dhcp", {
      is: (value: boolean) => !value,
      then: (schema) => schema.required("La direccion ip es requerida"),
      otherwise: (schema) => schema.optional(),
    }),
    mac: Yup.string()
      .required("La mac es requerida")
      .min(3, "La mac debe tener al menos 3 caracteres")
      .max(200, "La mac debe tener como máximo 200 caracteres"),
    inventoryNumber: Yup.string()
      .required("El número de inventario es requerido")
      .min(3, "El número de inventario debe tener al menos 3 caracteres")
      .max(200, "El número de inventario debe tener como máximo 200 caracteres"),
    sedeId: Yup.string().optional(),
    candado: Yup.boolean().optional(),
    codigo: Yup.string().when("candado", {
      is: (value: boolean) => value,
      then: (schema) =>
        schema
          .required("El codigo es requerido")
          .min(1, "El codigo debe tener al menos 1 caracter")
          .max(4, "El codigo debe tener como máximo 4 caracteres"),
      otherwise: (schema) => schema.optional(),
    }),
    typeEquipment: Yup.string()
      .required("El tipo de equipo es requerido")
      .min(3, "El tipo de equipo debe tener al menos 3 caracteres")
      .max(200, "El tipo de equipo debe tener como máximo 200 caracteres"),
    operationalSystem: Yup.string()
      .required("El sistema operativo es requerido")
      .min(3, "El sistema operativo debe tener al menos 3 caracteres")
      .max(200, "El sistema operativo debe tener como máximo 200 caracteres"),
    purchaseDate: Yup.date().required("La fecha de compra es requerida"),
    warranty: Yup.boolean().required("La garantia es requerida"),
    warrantyTime: Yup.string().when("warranty", {
      is: (value: boolean) => value,
      then: (schema) =>
        schema
          .required("El tiempo de garantia es requerido")
          .min(3, "El tiempo de garantia debe tener al menos 3 caracteres")
          .max(200, "El tiempo de garantia debe tener como máximo 200 caracteres"),
      otherwise: (schema) => schema.optional(),
    }),
    deliveryDate: Yup.date().required("La fecha de entrega es requerida"),
    manager: Yup.string().required("El responsable es requerido"),
    docDelivery: Yup.mixed()
      .nullable()
      .optional()
      .test("fileSize", "El archivo no debe ser menor a 1mb", (value: any) => {
        if (value) {
          return value.size <= 1000000;
        }
        return true;
      })
      .test("fileType", "Solo se permiten archivos PDF", (value: any) => {
        if (value) {
          return value.type === "application/pdf";
        }
        return true;
      }),
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      typeEquipment: "",
      brand: "",
      model: "",
      serial: "",
      operationalSystem: "",
      mac: "",
      purchaseDate: "",
      warrantyTime: "",
      warranty: false,
      deliveryDate: "",
      addressIp: "",
      dhcp: false,
      manager: "",
      candado: false,
      codigo: "",
      docDelivery: null,
      inventoryNumber: "",
      sedeId: idSede ? String(idSede) : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
        if (!idItem) {
          await createEquipment(values, () => {
            toast.success("Equipo creado exitosamente");
            setStadopen(false);
            formik.resetForm();
          });
        } else {
          await updateEquipment(idItem, values, () => {
            toast.success("Equipo actualizado exitosamente");
            setStadopen(false);
          });
        }
    },
  });

  useEffect(() => {
    if (items && idItem) {
      formik.setValues({
        name: items.nameEquipment,
        typeEquipment: items.typeEquipment,
        brand: items.brandEquipment,
        model: items.modelEquipment,
        serial: items.serialEquipment,
        operationalSystem: items.operationalSystem,
        mac: items.mac,
        purchaseDate: FormatDate(items.purchaseDate, false),
        warrantyTime: items.warrantyTime ? String(items.warrantyTime) : "",
        warranty: Boolean(items.warranty),
        deliveryDate: FormatDate(items.deliveryDate, false),
        addressIp: items.addressIp,
        dhcp: Boolean(items.dhcp),
        manager: String(items.idUser),
        candado: Boolean(items.lock),
        codigo: String(items.lockKey) === "N/A" ? "" : String(items.lockKey),
        docDelivery: null,
        inventoryNumber: items.inventoryNumberEquipment || "",
        sedeId: String(items.sedeId) || String(idSede) || "",
      });
    }
  }, [items, idItem]);

  return (
    <>
      <div className="relative group">
        <button
          className="p-2 duration-200 border-2 rounded-md hover:bg-gray-200 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
          onClick={() => setStadopen(true)}
        >
          {idItem ? (
            <PencilSquareIcon
              className="w-7 h-7"
              aria-label="Actualizar Item"
            />
          ) : (
            <div className="flex items-center">
              <span>Crear Item</span>
              <PlusCircleIcon className="w-5 h-5 ml-2" />
            </div>
          )}
        </button>
        {/* Tooltip */}
        {idItem && (
          <div className="absolute z-10 px-2 py-1 text-sm text-white transition-opacity duration-200 transform translate-y-1 bg-gray-800 rounded-md opacity-0 pointer-events-none -translate-x-14 w-28 left-1/2 group-hover:opacity-100 dark:bg-gray-900">
            Actualizar Item
            {/* Flechita detrás del texto */}
            <div className="absolute z-10 w-3 h-3 transform rotate-45 -translate-x-1/2 bg-gray-800 bottom-5.5 left-1/2 dark:bg-gray-900"></div>
          </div>
        )}
      </div>

      {/* init form */}
      <FormModal
        isOpen={stadopen}
        onClose={() => setStadopen(false)}
        onSubmit={formik.handleSubmit}
        title={idItem ? "Actualizar Item" : "Crear Item"}
        size="lg"
        submitText={idItem ? "Actualizar" : "Crear"}
        isSubmitting={isLoading}
        isValid={formik.isValid}
      >
        <div className="px-8 py-2">
          <div className="grid grid-cols-1 gap-8 mt-2 mb-6 md:grid-cols-2">
            <div>
              <Input
                type="text"
                label="Nombre del Item"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.name}
                error={formik.errors.name}
                icon={<TagIcon className="w-5 h-5" />}
                required
              />
            </div>

            <div>
              <Select
                options={["TODO EN 1", "LAPTOP", "PC MESA"].map((option) => ({
                  value: option,
                  label: option,
                }))}
                label="Tipo de Equipo"
                name="typeEquipment"
                value={formik.values.typeEquipment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.typeEquipment}
                error={formik.errors.typeEquipment}
                required
              />
            </div>
            {/* MARCA */}
            <div>
              <Select
                options={[
                  "LENOVO",
                  "COMPUMAX",
                  "ASUS",
                  "ACER",
                  "HP",
                  "DELL",
                  "EZVIZ",
                  "TPLINK",
                  "TENDA",
                  "UNIFI",
                  "GRANDSTREAM",
                ].map((option) => ({
                  value: option,
                  label: option,
                }))}
                label="Marca"
                id="brand"
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.brand}
                error={formik.errors.brand}
                required
              />
            </div>
            {/* MODELO */}
            <div>
              <Input
                type="text"
                label="Modelo"
                id="model"
                name="model"
                value={formik.values.model}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.model}
                error={formik.errors.model}
                required
                icon={<InformationCircleIcon className="w-5 h-5" />}
              />
            </div>
            {/* RESPONSABLE */}
            <InputAutocompletado
              label="Responsable"
              onInputChanged={(value) => formik.setFieldValue("manager", value)}
              apiRoute="search-user-by-name"
              error={
                formik.touched.manager && formik.errors.manager
                  ? formik.errors.manager
                  : undefined
              }
              touched={formik.touched.manager}
              required={true}
              placeholder="Ej: Juan Perez"
            />
            {/* SISTEMA OPERATIVO */}
            <div>
              <Select
                options={[
                  "WINDOWS 10",
                  "WINDOWS 11",
                  "WINDOWS 7",
                  "LINUX",
                  "MACOS",
                ].map((option) => ({
                  value: option,
                  label: option,
                }))}
                id="operationalSystem"
                label="Sistema Operativo"
                touched={formik.touched.operationalSystem}
                error={
                  formik.touched.operationalSystem && formik.errors.operationalSystem
                    ? formik.errors.operationalSystem
                    : undefined
                }
                name="operationalSystem"
                value={formik.values.operationalSystem}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <Input
                type="text"
                label="Serial"
                id="serial"
                name="serial"
                value={formik.values.serial}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.serial}
                error={formik.errors.serial}
                required
                icon={<FingerPrintIcon className="w-5 h-5" />}
              />
            </div>
            <div>
              <Input
                type="text"
                label="Dirección Mac"
                id="mac"
                name="mac"
                value={formik.values.mac}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.mac}
                error={formik.errors.mac}
                required
                icon={<FingerPrintIcon className="w-5 h-5" />}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 mt-2 mb-10 gap-x-6 gap-y-2">
            <div>
              <Input
                type="date"
                label="Fecha de Compra"
                id="purchaseDate"
                name="purchaseDate"
                value={formik.values.purchaseDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.purchaseDate}
                error={formik.errors.purchaseDate}
                required
                icon={<CalendarIcon className="w-5 h-5" />}
              />
            </div>

            <div>
              <Input
                type="date"
                id="deliveryDate"
                label="Fecha Entrega"
                name="deliveryDate"
                value={formik.values.deliveryDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.deliveryDate}
                error={formik.errors.deliveryDate}
                required
                icon={<CalendarDaysIcon className="w-5 h-5" />}
              />
            </div>

            <div>
              <Input
                type="file"
                label="Documento de Entrega"
                id="docDelivery"
                name="docDelivery"
                accept=".pdf"
                onChange={(event) => {
                  const file = event.target.files ? event.target.files[0] : null;
                  formik.setFieldValue("docDelivery", file);
                }}
                onBlur={formik.handleBlur}
                touched={formik.touched.docDelivery}
                error={formik.errors.docDelivery}
                icon={<IoDocumentTextOutline className="w-5 h-5" />}
              />
            </div>

            <div>
              <Input
                type="text"
                label="Número de Inventario"
                id="inventoryNumber"
                name="inventoryNumber"
                value={formik.values.inventoryNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.inventoryNumber}
                error={formik.errors.inventoryNumber}
                required
                icon={<TagIcon className="w-5 h-5" />}
              />
            </div>
            {idSede === null && (
              <div>
                <InputAutocompletado
                  label="Sede"
                  onInputChanged={(value) =>
                    formik.setFieldValue("sedeId", value)
                  }
                  apiRoute="lugares-radicacion-name"
                  placeholder="Ej: Sede 15"
                  error={
                    formik.touched.sedeId && formik.errors.sedeId
                      ? formik.errors.sedeId
                      : undefined
                  }
                  touched={formik.touched.sedeId}
                  helpText="Si actualiza este campo, se actualizará la sede donde se aloja el ítem, por lo tanto, se moverá a esa sede."
                />
              </div>
            )}
          </div>
        </div>
        <div className="px-4 py-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* ? garantia */}
            <div>
              <div className="flex items-center">
                <Input
                  type="checkbox"
                  label="Garantía"
                  variant="checkbox"
                  id="warranty"
                  name="warranty"
                  checked={formik.values.warranty}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-4 h-4 mr-2 md:w-5 md:h-5"
                  error={
                    formik.touched.warranty && formik.errors.warranty
                      ? formik.errors.warranty
                      : undefined
                  }
                  touched={formik.touched.warranty}
                  icon={<CheckCircleIcon className="w-5 h-5" />}
                />
              </div>

              {formik.values.warranty && (
                <div>
                  <Input
                    type="text"
                    label="Tiempo de Garantía"
                    id="warrantyTime"
                    name="warrantyTime"
                    value={formik.values.warrantyTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.warrantyTime}
                    error={formik.errors.warrantyTime}
                    icon={<CheckCircleIcon className="w-5 h-5" />}
                    required={formik.values.warranty}
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center">
                <Input
                  type="checkbox"
                  label="Dirección DCHP"
                  variant="checkbox"
                  id="dhcp"
                  name="dhcp"
                  checked={formik.values.dhcp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.dhcp && formik.errors.dhcp
                      ? formik.errors.dhcp
                      : undefined
                  }
                  touched={formik.touched.dhcp}
                  icon={<GlobeAltIcon className="w-5 h-5" />}
                />
              </div>
              {!formik.values.dhcp && (
                <div className="mt-2 md:mt-0">
                  <Input
                    type="text"
                    label="Dirección IP"
                    id="addressIp"
                    name="addressIp"
                    value={formik.values.addressIp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.addressIp}
                    error={formik.errors.addressIp}
                    icon={<GlobeAltIcon className="w-5 h-5" />}
                    required={formik.values.dhcp ? false : true}
                  />
                </div>
              )}
            </div>

            <div>
              <div>
                <Input
                  type="checkbox"
                  label="Candado"
                  variant="checkbox"
                  id="candado"
                  name="candado"
                  checked={formik.values.candado}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.candado && formik.errors.candado
                      ? formik.errors.candado
                      : undefined
                  }
                  touched={formik.touched.candado}
                  icon={<LockClosedIcon className="w-5 h-5" />}
                />
              </div>
              {formik.values.candado && (
                <div>
                  <Input
                    type="text"
                    label="Código"
                    id="codigo"
                    name="codigo"
                    value={formik.values.codigo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.codigo}
                    error={formik.errors.codigo}
                    icon={<LockClosedIcon className="w-5 h-5" />}
                    required={formik.values.candado}
                  />
                </div>
              )}
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
          </div>
        </div>
      </FormModal>
    </>
  );
};

export default ModalItemsForm;
