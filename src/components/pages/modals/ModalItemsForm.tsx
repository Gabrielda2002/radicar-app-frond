//*Funciones y Hooks
import * as Yup from "yup";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import { IItems } from "../../../models/IItems";
import React, { useEffect, useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
import { createItem } from "../../../services/createItem";
import { updateItem } from "../../../services/updateItem";
import { IItemsNetworking } from "../../../models/IItemsNetworking";

//*Icons
import {
  TagIcon,
  MapIcon,
  ComputerDesktopIcon,
  TvIcon,
  // InformationCircleIcon,
  // FingerPrintIcon,
  // GlobeAltIcon,
  // MapPinIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  KeyIcon,
  CalendarDaysIcon,
  LockClosedIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import InputAutocompletado from "../../InputAutocompletado";

interface ModalItemsFormProps {
  idSede: number | null;
  tipoItem: "equipos" | "dispositivos-red" | null;
  items: IItems | IItemsNetworking | null;
  idItem: number | null;
}

const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
    className="text-red-500"
  >
    {children}
  </motion.div>
);

const ModalItemsForm: React.FC<ModalItemsFormProps> = ({
  idSede,
  tipoItem,
  items,
  idItem,
}) => {
  const [stadopen, setStadopen] = useState(false);

  // estados para la reaccion del formulario
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submiting, setSubmiting] = useState(false);

  const { showAnimation, closing } = useAnimation(
    stadopen,
    () => setStadopen(false),
    300
  );

  const getValidationSchema = (typeItem: string | null) => {
    const validationSchema = {
      name: Yup.string()
        .required("El nombre es requerido")
        .min(2, "El nombre debe tener al menos 3 caracteres")
        .max(200, "El nombre debe tener como máximo 200 caracteres"),
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
      inventoryNumber: Yup.string()
        .required("El inventario es requerido")
        .min(3, "El inventario debe tener al menos 3 caracteres")
        .max(200, "El inventario debe tener como máximo 200 caracteres"),
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
        area: Yup.string()
          .required("El area es requerida")
          .min(3, "El area debe tener al menos 3 caracteres")
          .max(200, "El area debe tener como máximo 200 caracteres"),
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
        warrantyTime: Yup.string()
          .required("El tiempo de garantia es requerido")
          .min(3, "El tiempo de garantia debe tener al menos 3 caracteres")
          .max(
            200,
            "El tiempo de garantia debe tener como máximo 200 caracteres"
          ),
        warranty: Yup.boolean().required("La garantia es requerida"),
        deliveryDate: Yup.date().required("La fecha de entrega es requerida"),
        manager: Yup.string().optional(),
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
      area: "",
      typeEquipment: "",
      brand: "",
      model: "",
      serial: "",
      operationalSystem: "",
      mac: "",
      purchaseDate: "",
      warrantyTime: "",
      warranty: "",
      deliveryDate: "",
      inventoryNumber: "",
      addressIp: "",
      otherData: "",
      status: "",
      dhcp: false,
      manager: "",
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
        formData.append("inventoryNumber", values.inventoryNumber);
        formData.append("addressIp", values.addressIp);
        formData.append("mac", values.mac);
        formData.append("sedeId", idSede?.toString() || "");
        formData.append("dhcp", values.dhcp.toString());

        if (tipoItem === "equipos") {
          formData.append("area", values.area);
          formData.append("typeEquipment", values.typeEquipment);
          formData.append("operationalSystem", values.operationalSystem);
          formData.append("purchaseDate", values.purchaseDate);
          formData.append("warrantyTime", values.warrantyTime);
          formData.append("warranty", values.warranty);
          formData.append("deliveryDate", values.deliveryDate);
          formData.append("managerId", values.manager);
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
          setSuccess(true);
          setError(null);
          setTimeout(() => {
            setSuccess(false);
            setStadopen(false);
          }, 3000);
        } else {
          setError("Error al enviar los datos");
        }
      } catch (error) {
        setError(`Error al envair los datos: ${error}`);
      }
      setSubmiting(false);
    },
  });

  // console.log(formik.values.manager);
   console.log(formik.errors)

  const formatDate = (date: Date | string | null) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : ""; // Nos aseguramos de que sea una fecha válida
  };

  useEffect(() => {
    if (items && idItem) {
      formik.setValues({
        name: items.name,
        area: "area" in items ? items.area : "",
        typeEquipment: "typeEquipment" in items ? items.typeEquipment : "",
        brand: items.brand,
        model: items.model,
        serial: items.serial,
        operationalSystem:
          "operationalSystem" in items ? items.operationalSystem : "",
        mac: items.mac,
        purchaseDate:
          "purchaseDate" in items ? formatDate(items.purchaseDate) : "", // falta formatear la fecha
        warrantyTime: "warrantyTime" in items ? String(items.warrantyTime) : "",
        warranty: "warranty" in items ? (items.warranty ? "1" : "0") : "",
        deliveryDate:
          "deliveryDate" in items ? formatDate(items.deliveryDate) : "", // falta formatear la fecha
        inventoryNumber: items.inventoryNumber,
        addressIp: items.addressIp,
        otherData: "otherData" in items ? items.otherData : "",
        status: "status" in items ? items.status : "",
        dhcp: "dhcp" in items ? items.dhcp : false,
        manager: "idUsuario" in items ? String(items.idUsuario) : "",
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
          <div className="absolute z-10 px-2 py-1 text-sm text-white transition-opacity duration-200 transform translate-y-1 bg-gray-800 rounded-md opacity-0 pointer-events-none -translate-x-14 w-28 left-1/2 group-hover:opacity-100 dark:bg-gray-700">
            Actualizar Item
            {/* Flechita detrás del texto */}
            <div className="absolute z-0 w-3 h-3 transform rotate-45 -translate-x-1/2 bg-gray-800 bottom-[22px] left-1/2 dark:bg-gray-700"></div>
          </div>
        )}
      </div>

      {/* init event modal */}
      {stadopen && (
        <section
          className={`fixed inset-0 z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section className="">
            <div
              className={`w-[1000px] overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg dark:bg-gray-600 ${
                showAnimation && !closing ? "translate-y-0" : "translate-y-10"
              }`}
            >
              {/* container-header */}
              <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
                <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
                  {idItem ? "Actualizar Item" : "Crear Item"}
                </h1>
                <button
                  onClick={() => setStadopen(false)}
                  className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
                >
                  &times;
                </button>
              </div>

              {/* init form */}
              <form
                onSubmit={formik.handleSubmit}
                className="max-h-[70Vh] overflow-y-auto dark:bg-gray-800 dark:text-gray-200"
              >
                <div className="px-8 py-2">
                  {/* formularios */}
                  <div className="grid grid-cols-3 gap-8 mt-2">
                    <div>
                      <div className="flex items-center">
                        <TagIcon className="flex w-8 h-8 mr-2 dark:text-white" />
                        <label
                          htmlFor="name"
                          className="block text-lg font-semibold"
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
                    {tipoItem === "equipos" && (
                      <div>
                        <div className="flex items-center">
                          <MapIcon className="w-8 h-8 mr-2 dark:text-white" />
                          <label
                            htmlFor="area"
                            className="block text-lg font-semibold"
                          >
                            Area
                          </label>
                        </div>
                        <input
                          type="text"
                          id="area"
                          name="area"
                          value={formik.values.area}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                            formik.touched.area && formik.errors.area
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        />
                        <AnimatePresence>
                          {formik.touched.area && formik.errors.area ? (
                            <ErrorMessage>{formik.errors.area}</ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    )}

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

                    {tipoItem === "equipos" && (
                      <div>
                        <div className="flex items-center">
                          <ComputerDesktopIcon className="w-8 h-8 mr-2 dark:text-white" />
                          <label
                            htmlFor="typeEquipment"
                            className="block text-lg font-semibold"
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
                            formik.touched.typeEquipment &&
                            formik.errors.typeEquipment
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        >
                          <option value="">Selecciona</option>
                          <option value="TODO EN 1">Todo en 1</option>
                          <option value="PORTATIL">Portatil</option>
                          <option value="ESCRITORIO">Escritorio</option>
                        </select>
                        <AnimatePresence>
                          {formik.touched.typeEquipment &&
                          formik.errors.typeEquipment ? (
                            <ErrorMessage>
                              {formik.errors.typeEquipment}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 mt-5 gap-x-6 gap-y-2">
                    <div>
                      <div className="flex items-center">
                        <TvIcon className="w-8 h-8 mr-2 dark:text-white" />
                        <label
                          htmlFor="brand"
                          className="block text-lg font-semibold"
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
                        <option value="">Seleccione</option>
                        <option value="LENOVO">Lenovo</option>
                        <option value="COMPUMAX">Compumax</option>
                        <option value="ASUS">Asus</option>
                        <option value="ACER">Acer</option>
                        <option value="HP">HP</option>
                        <option value="DELL">Dell</option>
                      </select>
                      <AnimatePresence>
                        {formik.touched.brand && formik.errors.brand ? (
                          <ErrorMessage>{formik.errors.brand}</ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <InformationCircleIcon className="w-8 h-8 mr-2 dark:text-white" />
                        <label
                          htmlFor="model"
                          className="block text-lg font-semibold"
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
                    <div>
                      <div className="flex items-center">
                        <FingerPrintIcon className="w-8 h-8 mr-2 dark:text-white" />
                        <label
                          htmlFor="serial"
                          className="block text-lg font-semibold"
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

                  {tipoItem === "equipos" && (
                    <div>
                      <div className="flex items-center">
                        <ComputerDesktopIcon className="w-8 h-8 mr-2 dark:text-white" />
                        <label
                          htmlFor="typeEquipment"
                          className="block text-lg font-semibold"
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
                          formik.touched.typeEquipment &&
                          formik.errors.typeEquipment
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="">Selecciona</option>
                        <option value="TODO EN 1">Todo en 1</option>
                        <option value="PORTATIL">Portatil</option>
                        <option value="ESCRITORIO">Escritorio</option>
                      </select>
                      <AnimatePresence>
                        {formik.touched.typeEquipment &&
                        formik.errors.typeEquipment ? (
                          <ErrorMessage>
                            {formik.errors.typeEquipment}
                          </ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mt-10 mb-12">
                    <div>
                      {tipoItem === "equipos" && (
                        <>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="dhcp"
                              name="dhcp"
                              checked={formik.values.dhcp}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="mr-2"
                            />
                            <label
                              htmlFor="dhcp"
                              className="block text-lg font-semibold"
                            >
                              DHCP
                            </label>
                          </div>
                          <AnimatePresence>
                            {formik.touched.dhcp && formik.errors.dhcp ? (
                              <ErrorMessage>{formik.errors.dhcp}</ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </>
                      )}
                      {!formik.values.dhcp && (
                        <div>
                          <div className="flex items-center mt-2">
                            <LockClosedIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <label
                              htmlFor="addressIp"
                              className="block text-lg font-semibold"
                            >
                              Direccion Ip
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
                              formik.touched.addressIp &&
                              formik.errors.addressIp
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          />
                          <AnimatePresence>
                            {formik.touched.addressIp &&
                            formik.errors.addressIp ? (
                              <ErrorMessage>
                                {formik.errors.addressIp}
                              </ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      )}
                      {tipoItem === "equipos" && (
                        <div>
                          <div className="flex items-center">
                            <CalendarIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <label
                              htmlFor="purchaseDate"
                              className="block text-lg font-semibold"
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
                              formik.touched.purchaseDate &&
                              formik.errors.purchaseDate
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          />
                          <AnimatePresence>
                            {formik.touched.purchaseDate &&
                            formik.errors.purchaseDate ? (
                              <ErrorMessage>
                                {formik.errors.purchaseDate}
                              </ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      )}
                      {tipoItem === "equipos" && (
                        <div>
                          <div className="flex items-center mt-2">
                            <ClockIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <label
                              htmlFor="warrantyTime"
                              className="block text-lg font-semibold"
                            >
                              Tiempo de Garantia
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
                          <AnimatePresence>
                            {formik.touched.warrantyTime &&
                            formik.errors.warrantyTime ? (
                              <ErrorMessage>
                                {formik.errors.warrantyTime}
                              </ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>

                    <div>
                      {tipoItem === "equipos" && (
                        <div>
                          <div className="flex items-center">
                            <CalendarDaysIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <label
                              htmlFor="deliveryDate"
                              className="block text-lg font-semibold"
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
                              formik.touched.deliveryDate &&
                              formik.errors.deliveryDate
                                ? "border-red-500 dark:border-red-500"
                                : "borde-gray-200 dark:border-gray-600"
                            }`}
                          />
                          <AnimatePresence>
                            {formik.touched.deliveryDate &&
                            formik.errors.deliveryDate ? (
                              <ErrorMessage>
                                {formik.errors.deliveryDate}
                              </ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      )}

                      {tipoItem === "equipos" && (
                        <div>
                          <div className="flex items-center mt-2">
                            <CheckCircleIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <label
                              htmlFor="warranty"
                              className="block text-lg font-semibold"
                            >
                              Garantia
                            </label>
                          </div>
                          <select
                            id="warranty"
                            name="warranty"
                            value={formik.values.warranty}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                              formik.touched.warranty && formik.errors.warranty
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          >
                            <option value="">- SELECT -</option>
                            <option value={1}>Activa</option>
                            <option value={0}>Inactiva</option>
                          </select>
                          <AnimatePresence>
                            {formik.touched.warranty &&
                            formik.errors.warranty ? (
                              <ErrorMessage>
                                {formik.errors.warranty}
                              </ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      )}
                      <div>
                        <div className="flex items-center mt-2">
                          <KeyIcon className="w-8 h-8 mr-2 dark:text-white" />
                          <label
                            htmlFor="inventoryNumber"
                            className="block text-lg font-semibold"
                          >
                            Número de Inventario
                          </label>
                        </div>
                        <input
                          type="text"
                          id="inventoryNumber"
                          name="inventoryNumber"
                          value={formik.values.inventoryNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                            formik.touched.inventoryNumber &&
                            formik.errors.inventoryNumber
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        />
                        <AnimatePresence>
                          {formik.touched.inventoryNumber &&
                          formik.errors.inventoryNumber ? (
                            <ErrorMessage>
                              {formik.errors.inventoryNumber}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  {tipoItem === "dispositivos-red" && (
                    <div>
                      <label
                        htmlFor="otherData"
                        className="block mt-2 text-sm font-semibold"
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
                    <div>
                      <label
                        htmlFor="status"
                        className="block mt-2 text-sm font-semibold"
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
                </div>
                {/* container-footer */}
                <div className="flex items-center justify-end w-full gap-2 p-2 text-sm font-semibold bg-gray-200 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
                  <button
                    className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-600 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                    onClick={() => setStadopen(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="w-24 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                    type="submit"
                    disabled={submiting}
                  >
                    {submiting ? "Enviando..." : "Enviar"}
                  </button>
                  {success && (
                    <div className="text-green-500">
                      Datos enviados correctamente
                    </div>
                  )}

                  {error && <div className="text-red-500">{error}</div>}
                </div>
              </form>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalItemsForm;
