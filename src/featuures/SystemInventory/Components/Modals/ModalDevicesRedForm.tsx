//*Funciones y Hooks
import * as Yup from "yup";
import { AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { IItemsNetworking } from "@/models/IItemsNetworking";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import Input from "@/components/common/Ui/Input";

//*Icons
import {
  TagIcon,
  GlobeAltIcon,
  MapPinIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  FingerPrintIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import FormModal from "@/components/common/Ui/FormModal";
import Select from "@/components/common/Ui/Select";
import { useStoreDevicesRed } from "../../Store/useStoreDevicesRed";

interface ModalDevicesRedFormProps {
  idSede: number | null;
  items: IItemsNetworking | null;
  idItem: number | null;
  onSuccess: () => void;
}

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
  otherData: Yup.string()
    .required("Otros datos son requeridos")
    .min(3, "Otros datos deben tener al menos 3 caracteres")
    .max(200, "Otros datos deben tener como máximo 200 caracteres"),
  status: Yup.string()
    .required("El estado es requerido")
    .min(3, "El estado debe tener al menos 3 caracteres")
    .max(200, "El estado debe tener como máximo 200 caracteres"),
};

const ModalDevicesRedForm: React.FC<ModalDevicesRedFormProps> = ({
  idSede,
  items,
  idItem,
  onSuccess,
}) => {
  const [stadopen, setStadopen] = useState(false);

  const { createDevice, updateDevice, error, isLoading } = useStoreDevicesRed();

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      model: "",
      serial: "",
      addressIp: "",
      mac: "",
      otherData: "",
      status: "",
      dhcp: false,
      inventoryNumber: "",
      sedeId: idSede ? String(idSede) : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
        if (!idItem) {
          await createDevice(values, () => {
            toast.success("Dispositivo de Red creado exitosamente");
            setStadopen(false);
            formik.resetForm();
          });
        } else {
          await updateDevice(idItem, values, () => {
            toast.success("Dispositivo de Red actualizado exitosamente");
            setStadopen(false);
          });
        }

       
    },
  });

  useEffect(() => {
    if (items && idItem) {
      formik.setValues({
        name: items.name,
        brand: items.brand,
        model: items.model,
        serial: items.serial,
        addressIp: items.addressIp,
        mac: items.mac,
        otherData: items.otherData,
        status: items.status,
        dhcp: false,
        inventoryNumber: items.inventoryNumber || "",
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
            <PencilSquareIcon className="w-7 h-7" aria-label="Actualizar Item" />
          ) : (
            <div className="flex items-center">
              <span>Crear Item</span>
              <PlusCircleIcon className="w-5 h-5 ml-2" />
            </div>
          )}
        </button>
        {idItem && (
          <div className="absolute z-10 px-2 py-1 text-sm text-white transition-opacity duration-200 transform translate-y-1 bg-gray-800 rounded-md opacity-0 pointer-events-none -translate-x-14 w-28 left-1/2 group-hover:opacity-100 dark:bg-gray-900">
            Actualizar Item
            <div className="absolute z-10 w-3 h-3 transform rotate-45 -translate-x-1/2 bg-gray-800 bottom-5.5 left-1/2 dark:bg-gray-900"></div>
          </div>
        )}
      </div>

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
            <div>
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
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mt-2 mb-6 md:grid-cols-2 gap-x-6 gap-y-2">
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
                  onInputChanged={(value) => formik.setFieldValue("sedeId", value)}
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

          <div>
            <Input
              type="text"
              label="Otros Datos"
              id="otherData"
              name="otherData"
              value={formik.values.otherData}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.otherData}
              error={formik.errors.otherData}
              required
              icon={<MapPinIcon className="w-5 h-5" />}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="status" className="block mt-2 text-lg font-semibold">
              Estado
            </label>
            <select
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                formik.touched.status && formik.errors.status
                  ? "border-red-500 dark:border-red-500"
                  : "border-gray-200 dark:border-gray-600"
              }`}
            >
              <option value="">- SELECT -</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            <AnimatePresence>
              {formik.touched.status && formik.errors.status ? (
                <ErrorMessage>{formik.errors.status}</ErrorMessage>
              ) : null}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {error && (
              <div>
                <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">{error}</div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </FormModal>
    </>
  );
};

export default ModalDevicesRedForm;
