import React, { useState } from "react";
import { IItemsPhone } from "../../Models/IItemsPhone";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import useAnimation from "@/hooks/useAnimations";
import { PlusCircleIcon } from "lucide-react";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";

interface ModalFormPhoneProps {
  sedeId: number | null;
  refreshItems: () => void;
  items: IItemsPhone | null;
}
const ModalFormPhones: React.FC<ModalFormPhoneProps> = ({
  sedeId,
  refreshItems,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useBlockScroll(isOpen);

  const { showAnimation, closing } = useAnimation(
    isOpen,
    () => setIsOpen(false),
    300
  );

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(255, "El nombre debe tener maximo 255 caracteres"),
    brand: Yup.string()
      .required("La marca es requerida")
      .min(2, "La marca debe tener al menos 2 caracteres")
      .max(255, "La marca debe tener maximo 255 caracteres"),
    model: Yup.string()
      .required("El modelo es requerido")
      .min(3, "El modelo debe tener al menos 3 caracteres")
      .max(255, "El modelo debe tener maximo 255 caracteres"),
    serial: Yup.string()
      .required("El serial es requerido")
      .min(3, "El serial debe tener al menos 3 caracteres")
      .max(255, "El serial debe tener maximo 255 caracteres"),
    imei: Yup.string()
      .required("El IMEI es requerido")
      .min(15, "El IMEI debe tener al menos 15 caracteres")
      .max(17, "El IMEI debe tener maximo 17 caracteres"),
    operativeSystem: Yup.string()
      .required("El sistema operativo es requerido")
      .min(2, "El sistema operativo debe tener al menos 2 caracteres")
      .max(100, "El sistema operativo debe tener maximo 100 caracteres"),
    versionSO: Yup.string()
      .required("La version del sistema operativo es requerida")
      .min(1, "La version del sistema operativo debe tener al menos 1 caracter")
      .max(
        50,
        "La version del sistema operativo debe tener maximo 50 caracteres"
      ),
    storage: Yup.string()
      .required("El almacenamiento es requerido")
      .min(2, "El almacenamiento debe tener al menos 2 caracter")
      .max(50, "El almacenamiento debe tener maximo 50 caracteres"),
    storageRam: Yup.string()
      .required("La memoria RAM es requerida")
      .min(2, "La memoria RAM debe tener al menos 2 caracter")
      .max(50, "La memoria RAM debe tener maximo 50 caracteres"),
    phoneNumber: Yup.string()
      .required("El numero de telefono es requerido")
      .min(7, "El numero de telefono debe tener al menos 7 caracteres")
      .max(20, "El numero de telefono debe tener maximo 20 caracteres"),
    operador: Yup.string()
      .required("El operador es requerido")
      .min(2, "El operador debe tener al menos 2 caracteres")
      .max(100, "El operador debe tener maximo 50 caracteres"),
    typePlan: Yup.string()
      .required("El tipo de plan es requerido")
      .min(2, "El tipo de plan debe tener al menos 2 caracteres")
      .max(100, "El tipo de plan debe tener maximo 50 caracteres"),
    dueDatePlan: Yup.date().required(
      "La fecha de vencimiento del plan es requerida"
    ),
    macWifi: Yup.string()
      .required("La direccion MAC es requerida")
      .min(12, "La direccion MAC debe tener al menos 12 caracteres")
      .max(17, "La direccion MAC debe tener maximo 17 caracteres"),
    addressBluetooth: Yup.string()
      .required("La direccion Bluetooth es requerida")
      .min(12, "La direccion Bluetooth debe tener al menos 12 caracteres")
      .max(17, "La direccion Bluetooth debe tener maximo 17 caracteres"),
    purchaseDate: Yup.date().required("La fecha de compra es requerida"),
    warranty: Yup.boolean().required("La garantia es requerida"),
    warrantyTime: Yup.string().when("warranty", {
      is: (warranty: boolean) => warranty,
      then: (schema) =>
        schema
          .required("fecha de garantia es requerido")
          .min(2, "fecha de garantia debe tener al menos 2 caracteres")
          .max(100, "fecha de garantia debe tener maximo 50 caracteres"),
      otherwise: (schema) => schema.optional(),
    }),
    deliveryDate: Yup.date().required("La fecha de entrega es requerida"),
    responsable: Yup.string().required("El responsable es requerido"),
    caseProtector: Yup.boolean().required("El case protector es requerido"),
    tenperedGlass: Yup.boolean().required("El temperado es requerido"),
    observations: Yup.string().required("Las observaciones son requeridas"),
    status: Yup.string().required("El estado es requerido"),
    acquisitionValue: Yup.string().required(
      "El valor de adquisicion es requerido"
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      model: "",
      serial: "",
      imei: "",
      operativeSystem: "",
      versionSO: "",
      storage: "",
      storageRam: "",
      phoneNumber: "",
      operador: "",
      typePlan: "",
      dueDatePlan: "",
      macWifi: "",
      addressBluetooth: "",
      purchaseDate: "",
      warrantyTime: "",
      warranty: false,
      deliveryDate: "",
      responsable: 0,
      caseProtector: false,
      tenperedGlass: false,
      observations: "",
      status: "Activo",
      acquisitionValue: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
      refreshItems();
    },
  });

  return (
    <>
      <div>
        <button
          type="button"
          className="p-2 duration-200 border-2 rounded-md hover:bg-gray-200 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
          onClick={() => setIsOpen(true)}
        >
          {items ? (
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
      </div>
      {isOpen && (
        <section
          className={`fixed inset-0 z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section className="">
            <div
              className={`w-[420px] md:w-[1000px] overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg dark:bg-gray-600 ${
                showAnimation && !closing ? "translate-y-0" : "translate-y-10"
              }`}
            >
              {/* container-header */}
              <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
                <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
                  {/* {isUpdate ? "Actualizar Item" : "Crear Item"} */}
                  {items ? "Actualizar Item" : "Crear Item"}
                </h1>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
                >
                  &times;
                </button>
              </div>

              {/* container-body */}

              <div className="max-h-[74vh] md:max-h-[70vh] overflow-y-auto dark:bg-gray-800 dark:text-gray-200">
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-3 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label htmlFor="name" className="text-sm font-semibold">
                          Nombre:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.name && formik.errors.name
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="brand"
                          className="text-sm font-semibold"
                        >
                          Marca:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={formik.values.brand}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.brand && formik.errors.brand
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.brand && formik.errors.brand && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.brand}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="model"
                          className="text-sm font-semibold"
                        >
                          Modelo:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="model"
                        name="model"
                        value={formik.values.model}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.model && formik.errors.model
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.model && formik.errors.model && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.model}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="serial"
                          className="text-sm font-semibold"
                        >
                          Serial:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="serial"
                        name="serial"
                        value={formik.values.serial}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.serial && formik.errors.serial
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.serial && formik.errors.serial && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.serial}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label htmlFor="imei" className="text-sm font-semibold">
                          IMEI:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="imei"
                        name="imei"
                        value={formik.values.imei}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.imei && formik.errors.imei
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.imei && formik.errors.imei && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.imei}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="operativeSystem"
                          className="text-sm font-semibold"
                        >
                          Sistema Operativo:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="operativeSystem"
                        name="operativeSystem"
                        value={formik.values.operativeSystem}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.operativeSystem &&
                          formik.errors.operativeSystem
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.operativeSystem &&
                        formik.errors.operativeSystem && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.operativeSystem}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="versionSO"
                          className="text-sm font-semibold"
                        >
                          Version SO:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="versionSO"
                        name="versionSO"
                        value={formik.values.versionSO}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.versionSO && formik.errors.versionSO
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.versionSO && formik.errors.versionSO && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.versionSO}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="storage"
                          className="text-sm font-semibold"
                        >
                          Almacenamiento:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="storage"
                        name="storage"
                        value={formik.values.storage}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.storage && formik.errors.storage
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.storage && formik.errors.storage && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.storage}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="storageRam"
                          className="text-sm font-semibold"
                        >
                          Almacenamiento RAM:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="storageRam"
                        name="storageRam"
                        value={formik.values.storageRam}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.storageRam && formik.errors.storageRam
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.storageRam &&
                        formik.errors.storageRam && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.storageRam}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="phoneNumber"
                          className="text-sm font-semibold"
                        >
                          Numero de Telefono:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.phoneNumber &&
                        formik.errors.phoneNumber && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.phoneNumber}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="operador"
                          className="text-sm font-semibold"
                        >
                          Operador:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="operador"
                        name="operador"
                        value={formik.values.operador}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.operador && formik.errors.operador
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.operador && formik.errors.operador && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.operador}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="typePlan"
                          className="text-sm font-semibold"
                        >
                          Tipo de Plan:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="typePlan"
                        name="typePlan"
                        value={formik.values.typePlan}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.typePlan && formik.errors.typePlan
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.typePlan && formik.errors.typePlan && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.typePlan}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="dueDatePlan"
                          className="text-sm font-semibold"
                        >
                          Fecha de Vencimiento del Plan:
                        </label>
                      </div>

                      <input
                        type="date"
                        id="dueDatePlan"
                        name="dueDatePlan"
                        value={formik.values.dueDatePlan}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.dueDatePlan &&
                          formik.errors.dueDatePlan
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.dueDatePlan &&
                        formik.errors.dueDatePlan && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.dueDatePlan}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="macWifi"
                          className="text-sm font-semibold"
                        >
                          Direccion MAC Wifi:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="macWifi"
                        name="macWifi"
                        value={formik.values.macWifi}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.macWifi && formik.errors.macWifi
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.macWifi && formik.errors.macWifi && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.macWifi}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="addressBluetooth"
                          className="text-sm font-semibold"
                        >
                          Direccion Bluetooth:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="addressBluetooth"
                        name="addressBluetooth"
                        value={formik.values.addressBluetooth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.addressBluetooth &&
                          formik.errors.addressBluetooth
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.addressBluetooth &&
                        formik.errors.addressBluetooth && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.addressBluetooth}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="purchaseDate"
                          className="text-sm font-semibold"
                        >
                          Fecha de Compra:
                        </label>
                      </div>

                      <input
                        type="date"
                        id="purchaseDate"
                        name="purchaseDate"
                        value={formik.values.purchaseDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.purchaseDate &&
                          formik.errors.purchaseDate
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.purchaseDate &&
                        formik.errors.purchaseDate && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.purchaseDate}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="warranty"
                          className="text-sm font-semibold"
                        >
                          Garantia:
                        </label>
                      </div>

                      <input
                        type="checkbox"
                        id="warranty"
                        name="warranty"
                        checked={formik.values.warranty}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.warranty && formik.errors.warranty
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.warranty && formik.errors.warranty && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.warranty}
                        </div>
                      )}
                    </div>

                    {formik.values.warranty && (
                      <div className="flex flex-col justify-center w-full">
                        <div className="flex items-center">
                          <label
                            htmlFor="warrantyTime"
                            className="text-sm font-semibold"
                          >
                            Tiempo de Garantia:
                          </label>
                        </div>

                        <input
                          type="text"
                          id="warrantyTime"
                          name="warrantyTime"
                          value={formik.values.warrantyTime}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                            formik.touched.warrantyTime &&
                            formik.errors.warrantyTime
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        />
                        {formik.touched.warrantyTime &&
                          formik.errors.warrantyTime && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.warrantyTime}
                            </div>
                          )}
                      </div>
                    )}

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="deliveryDate"
                          className="text-sm font-semibold"
                        >
                          Fecha de Entrega:
                        </label>
                      </div>

                      <input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        value={formik.values.deliveryDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.deliveryDate &&
                          formik.errors.deliveryDate
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.deliveryDate &&
                        formik.errors.deliveryDate && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.deliveryDate}
                          </div>
                        )}
                    </div>

                    <InputAutocompletado
                      label="Responsable"
                      onInputChanged={(value) =>
                        formik.setFieldValue("responsable", value)
                      }
                      apiRoute="search-user-by-name"
                      error={
                        formik.touched.responsable &&
                        !!formik.errors.responsable
                      }
                    />

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="caseProtector"
                          className="text-sm font-semibold"
                        >
                          Protector de Carcasa:
                        </label>
                      </div>

                      <input
                        type="checkbox"
                        id="caseProtector"
                        name="caseProtector"
                        checked={formik.values.caseProtector}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.caseProtector &&
                          formik.errors.caseProtector
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.caseProtector &&
                        formik.errors.caseProtector && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.caseProtector}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="tenderGlass"
                          className="text-sm font-semibold"
                        >
                          Protector de Pantalla:
                        </label>
                      </div>

                      <input
                        type="checkbox"
                        id="tenderGlass"
                        name="tenperedGlass"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.tenperedGlass}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.tenperedGlass &&
                          formik.errors.tenperedGlass
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.tenperedGlass &&
                        formik.errors.tenperedGlass && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.tenperedGlass}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="observations"
                          className="text-sm font-semibold"
                        >
                          Observaciones:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="observations"
                        name="observations"
                        value={formik.values.observations}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.observations &&
                          formik.errors.observations
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.observations &&
                        formik.errors.observations && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.observations}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="status"
                          className="text-sm font-semibold"
                        >
                          Estado:
                        </label>
                      </div>

                      <select
                        id="status"
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.status && formik.errors.status
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="" label="Seleccione el estado" />
                        <option value="disponible" label="Disponible" />
                        <option value="enUso" label="En Uso" />
                        <option
                          value="enMantenimiento"
                          label="En Mantenimiento"
                        />
                        <option
                          value="fueraDeServicio"
                          label="Fuera de Servicio"
                        />
                      </select>
                      {formik.touched.status && formik.errors.status && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.status}
                        </div>
                      )}
                    </div>

                    {/* acquisition value */}
                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="acquisitionValue"
                          className="text-sm font-semibold"
                        >
                          Valor de Adquisicion:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="acquisitionValue"
                        name="acquisitionValue"
                        value={formik.values.acquisitionValue}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.acquisitionValue &&
                          formik.errors.acquisitionValue
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.acquisitionValue &&
                        formik.errors.acquisitionValue && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.acquisitionValue}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end w-full gap-2 p-2 text-sm font-semibold bg-gray-200 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
                    <button
                      className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-600 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                      onClick={() => setIsOpen(false)}
                      type="button"
                    >
                      Cerrar
                    </button>
                    <button
                      className="w-24 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                      type="submit"
                      disabled={!formik.isValid}
                    >
                      {items ? "Actualizar" : "Crear"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalFormPhones;
