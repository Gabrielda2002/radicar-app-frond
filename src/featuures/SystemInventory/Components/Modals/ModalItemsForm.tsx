//*Funciones y Hooks
import * as Yup from "yup";
import { AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import { IItems } from "@/models/IItems";
import React, { useEffect, useState } from "react";
import { createItem } from "@/featuures/SystemInventory/Services/CreateItem";
import { updateItem } from "@/featuures/SystemInventory/Services/UpdateItem";
import { IItemsNetworking } from "@/models/IItemsNetworking";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";

//*Icons
import {
  TagIcon,
  ComputerDesktopIcon,
  TvIcon,
  GlobeAltIcon,
  MapPinIcon,
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
import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import FormModal from "@/components/common/Ui/FormModal";

interface ModalItemsFormProps {
  idSede: number | null;
  tipoItem: string | null;
  items: IItems | IItemsNetworking | null;
  idItem: number | null;
  onSuccess: () => void;
}

const ModalItemsForm: React.FC<ModalItemsFormProps> = ({
  idSede,
  tipoItem,
  items,
  idItem,
  onSuccess,
}) => {
  const [stadopen, setStadopen] = useState(false);

  // estados para la reaccion del formulario
  const [error, setError] = useState<string | null>(null);
  const [submiting, setSubmiting] = useState(false);

  const getValidationSchema = (typeItem: string | null) => {
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
    };

    if (typeItem === "equipos") {
      return {
        ...validationSchema,
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
          .max(
            200,
            "El sistema operativo debe tener como máximo 200 caracteres"
          ),
        purchaseDate: Yup.date().required("La fecha de compra es requerida"),
        warranty: Yup.boolean().required("La garantia es requerida"),
        warrantyTime: Yup.string().when("warranty", {
          is: (value: boolean) => value,
          then: (schema) =>
            schema
              .required("El tiempo de garantia es requerido")
              .min(3, "El tiempo de garantia debe tener al menos 3 caracteres")
              .max(
                200,
                "El tiempo de garantia debe tener como máximo 200 caracteres"
              ),
          otherwise: (schema) => schema.optional(),
        }),
        deliveryDate: Yup.date().required("La fecha de entrega es requerida"),
        manager: Yup.string().required(),
        docDelivery: Yup.mixed()
          .nullable()
          .optional()
          .test(
            "fileSize",
            "El archivo no debe ser menor a 1mb",
            (value: any) => {
              if (value) {
                return value.size <= 1000000;
              }
              return true;
            }
          )
          .test("fileType", "Solo se permiten archivos PDF", (value: any) => {
            if (value) {
              return value.type === "application/pdf";
            }
            return true;
          }),
      };
    }

    if (typeItem === "dispositivos-red") {
      return {
        ...validationSchema,
        otherData: Yup.string()
          .required("Otros datos son requeridos")
          .min(3, "Otros datos deben tener al menos 3 caracteres")
          .max(200, "Otros datos deben tener como máximo 200 caracteres"),
        status: Yup.string()
          .required("El estado es requerido")
          .min(3, "El estado debe tener al menos 3  caracteres")
          .max(200, "El estado debe tener como máximo 200 caracteres"),
      };
    }

    return validationSchema;
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
      otherData: "",
      status: "",
      dhcp: false,
      manager: "",
      candado: false,
      codigo: "",
      docDelivery: null,
    },
    validationSchema: Yup.object(getValidationSchema(tipoItem)),
    onSubmit: async (values) => {
      setSubmiting(true);
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("brand", values.brand);
        formData.append("model", values.model);
        formData.append("serial", values.serial);
        formData.append("addressIp", values.addressIp);
        formData.append("mac", values.mac);
        formData.append("sedeId", idSede?.toString() || "");
        formData.append("dhcp", values.dhcp.toString());

        if (tipoItem === "equipos") {
          formData.append("typeEquipment", values.typeEquipment);
          formData.append("operationalSystem", values.operationalSystem);
          formData.append("purchaseDate", values.purchaseDate);
          formData.append("warrantyTime", values.warrantyTime);
          formData.append("warranty", values.warranty.toString());
          formData.append("deliveryDate", values.deliveryDate);
          formData.append("managerId", values.manager);
          formData.append("lock", values.candado.toString());
          formData.append("codeLock", values.codigo);
          if (values.docDelivery) formData.append("file", values.docDelivery);
        } else {
          formData.append("otherData", values.otherData);
          formData.append("status", values.status);
        }

        let response;
        if (!idItem) {
          response = await createItem(
            formData,
            tipoItem == "equipos" ? "equipos" : "dispositivos-red"
          );
        } else {
          response = await updateItem(
            idItem,
            formData,
            tipoItem == "equipos" ? "equipos" : "dispositivos-red"
          );
        }

        if (response?.status === 201 || response?.status === 200) {
          setError(null);
          toast.success("Datos enviados con éxito", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          formik.resetForm();

          if (onSuccess) {
            onSuccess();
          }

        } else {
          setError("Error al enviar los datos");
          toast.error("Error al enviar los datos", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        setError(`Error al enviar los datos: ${error}`);
        toast.error(`Error al enviar los datos: ${error}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setSubmiting(false);
    },
  });

  useEffect(() => {
    if (items && idItem) {
      formik.setValues({
        name:
          (items as IItems).nameEquipment || (items as IItemsNetworking).name,
        typeEquipment: "typeEquipment" in items ? items.typeEquipment : "",
        brand:
          (items as IItems).brandEquipment || (items as IItemsNetworking).brand,
        model:
          (items as IItems).modelEquipment || (items as IItemsNetworking).model,
        serial:
          (items as IItems).serialEquipment ||
          (items as IItemsNetworking).serial,
        operationalSystem:
          "operationalSystem" in items ? items.operationalSystem : "",
        mac: items.mac,
        purchaseDate:
          "purchaseDate" in items ? FormatDate(items.purchaseDate, false) : "",
        warrantyTime:
          "warrantyTime" in items
            ? items.warrantyTime
              ? String(items.warrantyTime)
              : ""
            : "",
        warranty: "warranty" in items ? Boolean(items.warranty) : false,
        deliveryDate:
          "deliveryDate" in items ? FormatDate(items.deliveryDate, false) : "",
        addressIp: items.addressIp,
        otherData: "otherData" in items ? items.otherData : "",
        status: "status" in items ? items.status : "",
        dhcp: "dhcp" in items ? Boolean(items.dhcp) : false,
        manager: "idUser" in items ? String(items.idUser) : "",
        candado:
          "lock" in items
            ? Boolean((items as IItems).lock) === true
              ? true
              : false
            : false,
        codigo:
          "lockKey" in items
            ? String((items as IItems).lockKey) === "N/A"
              ? ""
              : String((items as IItems).lockKey)
            : "",
        docDelivery: null,
      });
    }
  }, [items, idItem, tipoItem]);

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
            <div className="absolute z-10 w-3 h-3 transform rotate-45 -translate-x-1/2 bg-gray-800 bottom-[22px] left-1/2 dark:bg-gray-900"></div>
          </div>
        )}
      </div>

      {/* init form */}
      <FormModal
        isOpen={stadopen}
        onClose={() => setStadopen(false)}
        onSubmit={formik.handleSubmit}
        title={idItem ? 'Actualizar Item' : 'Crear Item'}
        size="lg"
        submitText={idItem ? "Actualizar" : "Crear"}
        isSubmitting={submiting}
        isValid={formik.isValid}
      >
        <div className="px-8 py-2">
          {/* formularios */}
          <div className="grid grid-cols-1 gap-8 mt-2 mb-6 md:grid-cols-2">
            {/* NOMBRE */}
            <div>
              <div className="flex items-center">
                <TagIcon className="flex w-8 h-8 mr-2 dark:text-white" />
                <label
                  htmlFor="name"
                  className="block font-semibold text-md md:text-lg"
                >
                  Nombre Del Item
                </label>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              />
              <AnimatePresence>
                {formik.touched.name && formik.errors.name ? (
                  <ErrorMessage>{formik.errors.name}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>

            {/* TIPO  */}

            {tipoItem === "equipos" && (
              <div>
                <div className="flex items-center">
                  <ComputerDesktopIcon className="w-8 h-8 mr-2 dark:text-white" />
                  <label
                    htmlFor="typeEquipment"
                    className="block font-semibold text-md md:text-lg"
                  >
                    Tipo de Equipo
                  </label>
                </div>
                <select
                  name="typeEquipment"
                  value={formik.values.typeEquipment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                    formik.touched.typeEquipment && formik.errors.typeEquipment
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <option value="">- SELECT -</option>
                  <option value="TODO EN 1">Todo en 1</option>
                  <option value="LAPTOP">Portatil</option>
                  <option value="PC MESA">Escritorio</option>
                </select>
                <AnimatePresence>
                  {formik.touched.typeEquipment &&
                  formik.errors.typeEquipment ? (
                    <ErrorMessage>{formik.errors.typeEquipment}</ErrorMessage>
                  ) : null}
                </AnimatePresence>
              </div>
            )}
            {/* MARCA */}
            <div>
              <div className="flex items-center">
                <TvIcon className="w-8 h-8 mr-2 dark:text-white" />
                <label
                  htmlFor="brand"
                  className="block font-semibold text-md md:text-lg"
                >
                  Marca
                </label>
              </div>
              <select
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                  formik.touched.brand && formik.errors.brand
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              >
                <option value="">- SELECT -</option>
                <option value="LENOVO">Lenovo</option>
                <option value="COMPUMAX">Compumax</option>
                <option value="ASUS">Asus</option>
                <option value="ACER">Acer</option>
                <option value="HP">HP</option>
                <option value="DELL">Dell</option>
                <option value="EZVIZ">EZVIZ</option>
                <option value="TPLINK">TPLINK</option>
                <option value="TENDA">TENDA</option>
                <option value="UNIFI">UNIFI</option>
                <option value="GRANDSTREAM">GRANDSTREAM</option>
              </select>
              <AnimatePresence>
                {formik.touched.brand && formik.errors.brand ? (
                  <ErrorMessage>{formik.errors.brand}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>
            {/* MODELO */}
            <div>
              <div className="flex items-center">
                <InformationCircleIcon className="w-8 h-8 mr-2 dark:text-white" />
                <label
                  htmlFor="model"
                  className="block font-semibold text-md md:text-lg"
                >
                  Modelo
                </label>
              </div>
              <input
                type="text"
                id="model"
                name="model"
                value={formik.values.model}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                  formik.touched.model && formik.errors.model
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              />
              <AnimatePresence>
                {formik.touched.model && formik.errors.model ? (
                  <ErrorMessage>{formik.errors.model}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>
            {/* RESPONSABLE */}
            {tipoItem === "equipos" && (
              <InputAutocompletado
                label="Responsable"
                onInputChanged={(value) =>
                  formik.setFieldValue("manager", value)
                }
                apiRoute="search-user-by-name"
                error={formik.touched.manager && !!formik.errors.manager}
              />
            )}
            {/* SISTEMA OPERATIVO */}
            {tipoItem === "equipos" && (
              <div>
                <div className="flex items-center">
                  <GlobeAltIcon className="w-8 h-8 mr-2 dark:text-white" />
                  <label
                    htmlFor="operationalSystem"
                    className="block font-semibold text-md md:text-lg"
                  >
                    Sistema Operativo
                  </label>
                </div>
                <select
                  name="operationalSystem"
                  value={formik.values.operationalSystem}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                    formik.touched.operationalSystem &&
                    formik.errors.operationalSystem
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <option value="">- SELECT -</option>
                  <option value="WINDOWS 10">Windows 10</option>
                  <option value="WINDOWS 11">Windows 11</option>
                  <option value="WINDOWS 7">Windows 7</option>
                </select>
                <AnimatePresence>
                  {formik.touched.operationalSystem &&
                  formik.errors.operationalSystem ? (
                    <ErrorMessage>
                      {formik.errors.operationalSystem}
                    </ErrorMessage>
                  ) : null}
                </AnimatePresence>
              </div>
            )}
            {/* SERIAL */}
            <div>
              <div className="flex items-center">
                <FingerPrintIcon className="w-8 h-8 mr-2 dark:text-white" />
                <label
                  htmlFor="serial"
                  className="block font-semibold text-md md:text-lg"
                >
                  Serial
                </label>
              </div>
              <input
                type="text"
                id="serial"
                name="serial"
                value={formik.values.serial}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                  formik.touched.serial && formik.errors.serial
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              />
              <AnimatePresence>
                {formik.touched.serial && formik.errors.serial ? (
                  <ErrorMessage>{formik.errors.serial}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>
            {/* DIR MAC */}
            <div>
              <div className="flex items-center">
                <MapPinIcon className="w-8 h-8 mr-2 dark:text-white" />
                <label
                  htmlFor="mac"
                  className="block font-semibold text-md md:text-lg"
                >
                  Dirección Mac
                </label>
              </div>
              <input
                type="text"
                id="mac"
                name="mac"
                value={formik.values.mac}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                  formik.touched.mac && formik.errors.mac
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              />
              <AnimatePresence>
                {formik.touched.mac && formik.errors.mac ? (
                  <ErrorMessage>{formik.errors.mac}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
          {/* <hr className="border-gray-400 dark:border-gray-600" /> */}
          {/* INFO ADD */}
          <div className="grid grid-cols-2 mt-2 mb-10 gap-x-6 gap-y-2">
            {tipoItem === "equipos" && (
              <div>
                <div className="flex items-center">
                  <CalendarIcon className="w-8 h-8 mr-2 dark:text-white" />
                  <label
                    htmlFor="purchaseDate"
                    className="block font-semibold text-md md:text-lg"
                  >
                    Fecha de Compra
                  </label>
                </div>
                <input
                  type="date"
                  id="purchaseDate"
                  name="purchaseDate"
                  value={formik.values.purchaseDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                    formik.touched.purchaseDate && formik.errors.purchaseDate
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                />
                <AnimatePresence>
                  {formik.touched.purchaseDate && formik.errors.purchaseDate ? (
                    <ErrorMessage>{formik.errors.purchaseDate}</ErrorMessage>
                  ) : null}
                </AnimatePresence>
              </div>
            )}

            {tipoItem === "equipos" && (
              <div>
                <div className="flex items-center">
                  <CalendarDaysIcon className="w-8 h-8 mr-2 dark:text-white" />
                  <label
                    htmlFor="deliveryDate"
                    className="block font-semibold text-md md:text-lg"
                  >
                    Fecha Entrega
                  </label>
                </div>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formik.values.deliveryDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                    formik.touched.deliveryDate && formik.errors.deliveryDate
                      ? "border-red-500 dark:border-red-500"
                      : "borde-gray-200 dark:border-gray-600"
                  }`}
                />
                <AnimatePresence>
                  {formik.touched.deliveryDate && formik.errors.deliveryDate ? (
                    <ErrorMessage>{formik.errors.deliveryDate}</ErrorMessage>
                  ) : null}
                </AnimatePresence>
              </div>
            )}
          </div>
          <hr className="border-gray-400 dark:border-gray-600" />
          {tipoItem === "dispositivos-red" && (
            <div>
              <label
                htmlFor="otherData"
                className="block mt-2 text-lg font-semibold"
              >
                Otros Datos
              </label>
              <input
                type="text"
                id="otherData"
                name="otherData"
                value={formik.values.otherData}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                  formik.touched.otherData && formik.errors.otherData
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              />
              <AnimatePresence>
                {formik.touched.otherData && formik.errors.otherData ? (
                  <ErrorMessage>{formik.errors.otherData}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>
          )}
          {tipoItem === "dispositivos-red" && (
            <div className="mb-2">
              <label
                htmlFor="status"
                className="block mt-2 text-lg font-semibold"
              >
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
          )}
          {tipoItem === "dispositivos-red" && (
            <>
              {!formik.values.dhcp && (
                <div>
                  <div className="flex items-center">
                    <label
                      htmlFor="addressIp"
                      className="block text-lg font-semibold"
                    >
                      Direccion Ip (estática)
                    </label>
                  </div>
                  <input
                    type="text"
                    id="addressIp"
                    name="addressIp"
                    value={formik.values.addressIp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                      formik.touched.addressIp && formik.errors.addressIp
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-600"
                    }`}
                  />
                  <AnimatePresence>
                    {formik.touched.addressIp && formik.errors.addressIp ? (
                      <ErrorMessage>{formik.errors.addressIp}</ErrorMessage>
                    ) : null}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </div>
        <div className="px-4 py-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* ? garantia */}
            <div>
              {tipoItem === "equipos" && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="warranty"
                    name="warranty"
                    checked={formik.values.warranty}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-4 h-4 mr-2 md:w-5 md:h-5"
                  />
                  <CheckCircleIcon className="w-5 h-5 mr-2 md:w-8 md:h-8 dark:text-white" />
                  <label
                    htmlFor="warranty"
                    className="block text-lg font-semibold"
                  >
                    Garantía
                  </label>
                  <AnimatePresence>
                    {formik.touched.warranty && formik.errors.warranty ? (
                      <ErrorMessage>{formik.errors.warranty}</ErrorMessage>
                    ) : null}
                  </AnimatePresence>
                </div>
              )}

              {tipoItem === "equipos" && formik.values.warranty && (
                <div>
                  <label
                    htmlFor="warrantyTime"
                    className="block text-lg font-semibold"
                  >
                    Tiempo de Garantía
                  </label>
                  <input
                    type="text"
                    id="warrantyTime"
                    name="warrantyTime"
                    value={formik.values.warrantyTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                      formik.touched.warrantyTime && formik.errors.warrantyTime
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-600"
                    }`}
                  />
                  <AnimatePresence>
                    {formik.touched.warrantyTime &&
                    formik.errors.warrantyTime ? (
                      <ErrorMessage>{formik.errors.warrantyTime}</ErrorMessage>
                    ) : null}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* ? IP */}
            <div>
              {tipoItem === "equipos" && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="dhcp"
                    name="dhcp"
                    checked={formik.values.dhcp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-4 h-4 mr-2 md:w-5 md:h-5"
                  />
                  <LockClosedIcon className="w-5 h-5 mr-2 md:w-8 md:h-8 dark:text-white" />
                  <label
                    htmlFor="dhcp"
                    className="block font-semibold text-gray-500 text-md dark:text-white"
                  >
                    Dirección DCHP
                  </label>
                  <AnimatePresence>
                    {formik.touched.dhcp && formik.errors.dhcp ? (
                      <ErrorMessage>{formik.errors.dhcp}</ErrorMessage>
                    ) : null}
                  </AnimatePresence>
                </div>
              )}
              {tipoItem === "equipos" && !formik.values.dhcp && (
                <div className="mt-2 md:mt-0">
                  <label
                    htmlFor="addressIp"
                    className="block text-lg font-semibold"
                  >
                    Direccion Ip (estática)
                  </label>
                  <input
                    type="text"
                    id="addressIp"
                    name="addressIp"
                    value={formik.values.addressIp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                      formik.touched.addressIp && formik.errors.addressIp
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-600"
                    }`}
                  />
                  <AnimatePresence>
                    {formik.touched.addressIp && formik.errors.addressIp ? (
                      <ErrorMessage>{formik.errors.addressIp}</ErrorMessage>
                    ) : null}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {tipoItem === "equipos" && (
              <div>
                <label
                  htmlFor="docDelivery"
                  className="block text-lg font-semibold"
                >
                  Documento de Entrega
                </label>
                <input
                  type="file"
                  id="docDelivery"
                  name="docDelivery"
                  accept=".pdf"
                  onChange={(event) => {
                    const file = event.target.files
                      ? event.target.files[0]
                      : null;
                    formik.setFieldValue("docDelivery", file);
                  }}
                  onBlur={formik.handleBlur}
                  className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                    formik.touched.docDelivery && formik.errors.docDelivery
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                />
                <AnimatePresence>
                  {formik.touched.docDelivery && formik.errors.docDelivery ? (
                    <ErrorMessage>{formik.errors.docDelivery}</ErrorMessage>
                  ) : null}
                </AnimatePresence>
              </div>
            )}

            <div>
              {tipoItem === "equipos" && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="candado"
                    name="candado"
                    checked={formik.values.candado}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-4 h-4 mr-2 md:w-5 md:h-5"
                  />
                  <LockClosedIcon className="w-5 h-5 mr-2 md:w-8 md:h-8 dark:text-white" />
                  <label
                    htmlFor="candado"
                    className="block font-semibold text-gray-500 text-md dark:text-white"
                  >
                    Candado
                  </label>
                  <AnimatePresence>
                    {formik.touched.candado && formik.errors.candado ? (
                      <ErrorMessage>{formik.errors.candado}</ErrorMessage>
                    ) : null}
                  </AnimatePresence>
                </div>
              )}
              {formik.values.candado && (
                <div>
                  <label
                    htmlFor="codigo"
                    className="block text-lg font-semibold"
                  >
                    Combinación Código
                  </label>
                  <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    value={formik.values.codigo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                      formik.touched.codigo && formik.errors.codigo
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-600"
                    }`}
                  />
                  <AnimatePresence>
                    {formik.touched.codigo && formik.errors.codigo ? (
                      <ErrorMessage>{formik.errors.codigo}</ErrorMessage>
                    ) : null}
                  </AnimatePresence>
                </div>
              )}
              {error && <ErrorMessage className="mt-2">{error}</ErrorMessage>}
            </div>
          </div>
        </div>
      </FormModal>
    </>
  );
};

export default ModalItemsForm;
