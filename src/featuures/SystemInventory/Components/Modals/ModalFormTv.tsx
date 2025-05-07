import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import useAnimation from "@/hooks/useAnimations";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "lucide-react";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import { useCreateTv } from "../../Hooks/useCreateTv";
import { toast } from "react-toastify";
import { IItemsTv } from "../../Models/IItemsTv";

interface ModalFormTvProps {
  sedeId: number | null;
  refreshItems: () => void;
  items: IItemsTv | null;
}

const ModalFormTv: React.FC<ModalFormTvProps> = ({
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

  const { createTv, updateTv, loading, error } = useCreateTv();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("nombre es requerido")
      .min(3, "nombre debe tener al menos 3 caracteres")
      .max(255, "nombre debe tener maximo 50 caracteres"),
    location: Yup.string()
      .required("ubicacion es requerido")
      .min(3, "ubicacion debe tener al menos 3 caracteres")
      .max(255, "ubicacion debe tener maximo 255 caracteres"),
    brand: Yup.string()
      .required("marca es requerido")
      .min(1, "marca debe tener al menos 1 caracteres")
      .max(50, "marca debe tener maximo 50 caracteres"),
    model: Yup.string()
      .required("modelo es requerido")
      .min(1, "modelo debe tener al menos 1 caracteres")
      .max(50, "modelo debe tener maximo 50 caracteres"),
    serial: Yup.string()
      .required("serial es requerido")
      .min(1, "serial debe tener al menos 1 caracteres")
      .max(50, "serial debe tener maximo 50 caracteres"),
    pulgadas: Yup.string().required("pulgadas es requerido"),
    screenType: Yup.string().required("tipo de pantalla es requerido"),
    smartTv: Yup.boolean().required("smart tv es requerido"),
    operativeSystem: Yup.string().required("sistema operativo es requerido"),
    addressIp: Yup.string()
      .required("direccion ip es requerido")
      .min(7, "direccion ip debe tener al menos 7 caracteres")
      .max(20, "direccion ip debe tener maximo 20 caracteres"),
    mac: Yup.string()
      .required("mac es requerido")
      .min(12, "mac debe tener al menos 12 caracteres")
      .max(17, "mac debe tener maximo 17 caracteres"),
    resolution: Yup.string()
      .required("resolucion es requerido")
      .min(1, "resolucion debe tener al menos 1 caracteres")
      .max(50, "resolucion debe tener maximo 50 caracteres"),
    numPuertosHdmi: Yup.number().required(
      "numero de puertos hdmi es requerido"
    ),
    numPuertosUsb: Yup.number().required("numero de puertos usb es requerido"),
    connectivity: Yup.string()
      .required("conectividad es requerido")
      .min(1, "conectividad debe tener al menos 1 caracteres")
      .max(100, "conectividad debe tener maximo 100 caracteres"),
    purchaseDate: Yup.date().required("fecha de compra es requerido"),
    warranty: Yup.boolean().required("garantia es requerido"),
    warrantyTime: Yup.string().when("warranty", {
      is: (warranty: boolean) => warranty,
      then: (schema) =>
        schema
          .required("fecha de garantia es requerido")
          .min(2, "fecha de garantia debe tener al menos 2 caracteres")
          .max(100, "fecha de garantia debe tener maximo 50 caracteres"),
      otherwise: (schema) => schema.optional(),
    }),
    deliveryDate: Yup.date().required("fecha de entrega es requerido"),
    observation: Yup.string().required("observacion es requerido"),
    status: Yup.string().required("estado es requerido"),
    acquisitionValue: Yup.number()
      .required("valor de adquisicion es requerido")
      .positive("valor de adquisicion debe ser un numero positivo")
      .min(0, "valor de adquisicion debe ser mayor a 0")
      .max(10000000, "valor de adquisicion debe ser menor a 10000000"),
    controlRemote: Yup.boolean().required("control remoto es requerido"),
    utility: Yup.string()
      .required("utilidad es requerido")
      .min(1, "utilidad debe tener al menos 1 caracteres")
      .max(50, "utilidad debe tener maximo 50 caracteres"),
    responsable: Yup.string().required("responsable es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      brand: "",
      model: "",
      serial: "",
      pulgadas: "",
      screenType: "",
      smartTv: false,
      operativeSystem: "",
      addressIp: "",
      mac: "",
      resolution: "",
      numPuertosHdmi: 0,
      numPuertosUsb: 0,
      connectivity: "",
      purchaseDate: "",
      warrantyTime: "",
      warranty: false,
      deliveryDate: "",
      observation: "",
      status: "",
      acquisitionValue: 0,
      controlRemote: false,
      utility: "",
      responsable: "",
      sedeId: sedeId,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response =
          items === null
            ? await createTv(values)
            : await updateTv(values, items.id);

        if (response && response.data) {
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

          setTimeout(() => {
            setIsOpen(false);
          }, 3000);

          if (refreshItems) {
            refreshItems();
          }
        }
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
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

              {/* contenido */}
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
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
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
                          htmlFor="location"
                          className="text-sm font-semibold"
                        >
                          Ubicacion:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.location && formik.errors.location
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.location && formik.errors.location && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.location}
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
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
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
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
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
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
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
                        <label
                          htmlFor="pulgadas"
                          className="text-sm font-semibold"
                        >
                          Pulgadas:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="pulgadas"
                        name="pulgadas"
                        value={formik.values.pulgadas}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.pulgadas && formik.errors.pulgadas
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.pulgadas && formik.errors.pulgadas && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.pulgadas}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="screenType"
                          className="text-sm font-semibold"
                        >
                          Tipo de Pantalla:
                        </label>
                      </div>
                      <select
                        id="screenType"
                        name="screenType"
                        value={formik.values.screenType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.screenType && formik.errors.screenType
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="" disabled>
                          Seleccione el tipo de pantalla
                        </option>
                        <option value="LCD">LCD</option>
                        <option value="LED">LED</option>
                        <option value="OLED">OLED</option>
                        <option value="QLED">QLED</option>
                        <option value="AMOLED">AMOLED</option>
                        <option value="Plasma">Plasma</option>
                        <option value="MicroLED">MicroLED</option>
                      </select>
                      {formik.touched.screenType &&
                        formik.errors.screenType && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.screenType}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="smartTv"
                          className="text-sm font-semibold"
                        >
                          Smart TV:
                        </label>
                      </div>

                      <input
                        type="checkbox"
                        id="smartTv"
                        name="smartTv"
                        checked={formik.values.smartTv}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.smartTv && formik.errors.smartTv
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.smartTv && formik.errors.smartTv && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.smartTv}
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
                      <select
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
                      >
                        <option value="" disabled>
                          Seleccione el sistema operativo
                        </option>
                        <option value="Windows">Windows</option>
                        <option value="macOS">macOS</option>
                        <option value="Linux">Linux</option>
                        <option value="Android">Android</option>
                        <option value="iOS">iOS</option>
                        <option value="Chrome OS">Chrome OS</option>
                        <option value="Unix">Unix</option>
                        <option value="FreeBSD">FreeBSD</option>
                        <option value="OpenBSD">OpenBSD</option>
                        <option value="Solaris">Solaris</option>
                        <option value="Other">Otro</option>
                      </select>
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
                          htmlFor="addressIp"
                          className="text-sm font-semibold"
                        >
                          Direccion IP:
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
                      {formik.touched.addressIp && formik.errors.addressIp && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.addressIp}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label htmlFor="mac" className="text-sm font-semibold">
                          MAC:
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
                      {formik.touched.mac && formik.errors.mac && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.mac}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="resolution"
                          className="text-sm font-semibold"
                        >
                          Resolucion:
                        </label>
                      </div>

                      <input
                        type="text"
                        id="resolution"
                        name="resolution"
                        value={formik.values.resolution}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.resolution && formik.errors.resolution
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.resolution &&
                        formik.errors.resolution && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.resolution}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="numPuertosHdmi"
                          className="text-sm font-semibold"
                        >
                          Numero de Puertos HDMI:
                        </label>
                      </div>

                      <input
                        type="number"
                        id="numPuertosHdmi"
                        name="numPuertosHdmi"
                        value={formik.values.numPuertosHdmi}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.numPuertosHdmi &&
                          formik.errors.numPuertosHdmi
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.numPuertosHdmi &&
                        formik.errors.numPuertosHdmi && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.numPuertosHdmi}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="numPuertosUsb"
                          className="text-sm font-semibold"
                        >
                          Numero de Puertos USB:
                        </label>
                      </div>

                      <input
                        type="number"
                        id="numPuertosUsb"
                        name="numPuertosUsb"
                        value={formik.values.numPuertosUsb}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.numPuertosUsb &&
                          formik.errors.numPuertosUsb
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.numPuertosUsb &&
                        formik.errors.numPuertosUsb && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.numPuertosUsb}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="connectivity"
                          className="text-sm font-semibold"
                        >
                          Conectividad:
                        </label>
                      </div>
                      <input
                        type="text"
                        id="connectivity"
                        name="connectivity"
                        value={formik.values.connectivity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.connectivity &&
                          formik.errors.connectivity
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.connectivity &&
                        formik.errors.connectivity && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.connectivity}
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
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
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
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
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
                          className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
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
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
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

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="observation"
                          className="text-sm font-semibold"
                        >
                          Observacion:
                        </label>
                      </div>
                      <input
                        type="text"
                        id="observation"
                        name="observation"
                        value={formik.values.observation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.observation &&
                          formik.errors.observation
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.observation &&
                        formik.errors.observation && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.observation}
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
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.status && formik.errors.status
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="" disabled>
                          Seleccione el estado
                        </option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                        <option value="En Mantenimiento">
                          En Mantenimiento
                        </option>
                      </select>
                      {formik.touched.status && formik.errors.status && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.status}
                        </div>
                      )}
                    </div>

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
                        type="number"
                        id="acquisitionValue"
                        name="acquisitionValue"
                        value={formik.values.acquisitionValue}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
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

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="controlRemote"
                          className="text-sm font-semibold"
                        >
                          Control Remoto:
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="controlRemote"
                        name="controlRemote"
                        checked={formik.values.controlRemote}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.controlRemote &&
                          formik.errors.controlRemote
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.controlRemote &&
                        formik.errors.controlRemote && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.controlRemote}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
                        <label
                          htmlFor="utility"
                          className="text-sm font-semibold"
                        >
                          Utilidad:
                        </label>
                      </div>
                      <input
                        type="text"
                        id="utility"
                        name="utility"
                        value={formik.values.utility}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.utility && formik.errors.utility
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      {formik.touched.utility && formik.errors.utility && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.utility}
                        </div>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center justify-center w-full p-2 text-sm font-semibold text-red-500 bg-red-100 border-2 border-red-500 rounded-md dark:bg-red-900 dark:text-red-200 dark:border-red-700">
                      {error}
                    </div>
                  )}

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
                      disabled={loading || !formik.isValid}
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

export default ModalFormTv;
