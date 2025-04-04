import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import useAnimation from "@/hooks/useAnimations";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFetchClassification } from "../../Hooks/useFetchClassification";
import { useFetchAsset } from "../../Hooks/useFetchAsset";
import { useFetchMaterials } from "../../Hooks/useFetchMaterials";
import { useFetchStatusIvGeneral } from "../../Hooks/useFetchStatusIvGeneral";
import { useTypeArea } from "../../Hooks/useTypeArea";
import { useFetchAssetType } from "../../Hooks/useFetchAssetType";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import { useCreateItemIvGeneral } from "../../Hooks/useCreateItemIvGeneral";
import { toast } from "react-toastify";
import { useFetchAreaDependency } from "../../Hooks/useFetchAreaDependency";

interface IModalFormGeneralItemsProps {
  idSede?: number | null;
  tipoItem?: "inventario/general";
  isUpdate?: boolean;
  refreshItems: () => void;
}

const ModalFormGeneralItems: React.FC<IModalFormGeneralItemsProps> = ({
  idSede,
  tipoItem,
  isUpdate,
  refreshItems,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useBlockScroll(isOpen);

  const { showAnimation, closing } = useAnimation(
    isOpen,
    () => setIsOpen(false),
    300
  );

  // clasificacion
  const { classification } = useFetchClassification();

  const { asset, fetchData } = useFetchAsset();

  const { materials } = useFetchMaterials();

  const { statusIvGeneral } = useFetchStatusIvGeneral();

  const { typeArea } = useTypeArea();

  const { assetType } = useFetchAssetType();

  const  { areaDependency } = useFetchAreaDependency();

  const { createItem, error, loading } = useCreateItemIvGeneral();
  console.log(error)

  const schemaValidation = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    classification: Yup.string().required("La clasificación es requerida"),
    asset: Yup.string().required("El activo es requerido"),
    brand: Yup.string().optional(),
    model: Yup.string().optional(),
    material: Yup.string().required("El material es requerido"),
    serialNumber: Yup.string().optional(),
    status: Yup.string().required("El estado es requerido"),
    areaType: Yup.string().required("El tipo de área es requerido"),
    areaDependency: Yup.string().required("La dependencia es requerida"),
    location: Yup.string().required("La ubicación es requerida"),
    assetType: Yup.string().required("El tipo de activo es requerido"),
    quantity: Yup.number().required("La cantidad es requerida"),
    responsable: Yup.string().required("El responsable es requerido"),
    othersDetails: Yup.string().required(
      "Los detalles adicionales son requeridos"
    ),
    acquisitionDate: Yup.date().optional(),
    purchaseValue: Yup.number().optional(),
    warranty: Yup.boolean().optional(),
    warrantyPeriod: Yup.string().when("warranty", {
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
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      classification: "",
      asset: "",
      brand: "",
      model: "",
      material: "",
      serialNumber: "",
      status: "",
      areaType: "",
      areaDependency: "",
      location: "",
      assetType: "",
      quantity: 0,
      responsable: "",
      othersDetails: "",
      acquisitionDate: "",
      purchaseValue: "",
      warranty: false,
      warrantyPeriod: "",
    },
    validationSchema: schemaValidation,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("brand", values.brand);
        formData.append("model", values.model);
        formData.append("serialNumber", values.serialNumber);
        formData.append("location", values.location);
        formData.append("quantity", values.quantity.toString());
        formData.append("otherDetails", values.othersDetails);
        formData.append("acquisitionDate", values.acquisitionDate);
        formData.append("purchaseValue", values.purchaseValue.toString());
        formData.append("warranty", values.warranty.toString());
        formData.append("warrantyPeriod", values.warrantyPeriod);
        formData.append("classificationId", values.classification);
        formData.append("headquartersId", idSede?.toString() || "");
        formData.append("statusId", values.status);
        formData.append("assetId", values.asset);
        formData.append("materialId", values.material);
        formData.append("areaTypeId", values.areaType);
        formData.append("assetTypeId", values.assetType);
        formData.append("responsableId", values.responsable);
        formData.append("dependencyAreaId", values.areaDependency);

        const response = await createItem(formData);

        if (response) {
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
          setTimeout(() => {
            setIsOpen(false);
            formik.resetForm();
          }, 3000);

          if (refreshItems) {
            refreshItems();
          }

        }
      } catch (error) {
        console.log("Error inesperado", error);
      }
    },
  });

  console.log(formik.errors)
  return (
    <>
      <button
        className="p-2 duration-200 border-2 rounded-md hover:bg-gray-200 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
        onClick={() => setIsOpen(true)}
      >
        {isUpdate ? (
          <PencilSquareIcon className="w-7 h-7" aria-label="Actualizar Item" />
        ) : (
          <div className="flex items-center">
            <span>Crear Item</span>
            <PlusCircleIcon className="w-5 h-5 ml-2" />
          </div>
        )}
      </button>
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
                  {isUpdate ? "Actualizar Item" : "Crear Item"}
                </h1>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
                >
                  &times;
                </button>
              </div>

              {/* container-body */}
              <div className="max-h-[74Vh] md:max-h-[70Vh] overflow-y-auto dark:bg-gray-800 dark:text-gray-200">
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-3 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center">
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

                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="classification"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Clasificación
                        </label>
                      </div>
                      <select
                        name=""
                        id="classification"
                        value={formik.values.classification}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "classification",
                            e.target.value
                          );
                          fetchData(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.classification &&
                          formik.errors.classification
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="">SELECT</option>
                        {classification &&
                          classification.length > 0 &&
                          classification.map((op) => (
                            <option key={op.id} value={op.id}>
                              {op.name}
                            </option>
                          ))}
                      </select>
                      <AnimatePresence>
                        {formik.touched.classification &&
                        formik.errors.classification ? (
                          <ErrorMessage>
                            {formik.errors.classification}
                          </ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="asset"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Activo
                        </label>
                      </div>
                      <select
                        name=""
                        id="asset"
                        value={formik.values.asset}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.asset && formik.errors.asset
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="">SELECT</option>
                        {asset &&
                          asset.length > 0 &&
                          asset.map((op) => (
                            <option key={op.id} value={op.id}>
                              {op.name}
                            </option>
                          ))}
                      </select>
                      <AnimatePresence>
                        {formik.touched.asset && formik.errors.asset ? (
                          <ErrorMessage>{formik.errors.asset}</ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* brand */}
                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="brand"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Marca
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
                      <AnimatePresence>
                        {formik.touched.brand && formik.errors.brand ? (
                          <ErrorMessage>{formik.errors.brand}</ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* model */}
                    <div>
                      <div className="flex items-center">
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

                    {/* material */}
                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="material"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Material
                        </label>
                      </div>
                      <select
                        name=""
                        id="material"
                        value={formik.values.material}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.material && formik.errors.material
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="">SELECT</option>
                        {materials &&
                          materials.length > 0 &&
                          materials.map((op) => (
                            <option key={op.id} value={op.id}>
                              {op.name}
                            </option>
                          ))}
                      </select>
                      <AnimatePresence>
                        {formik.touched.material && formik.errors.material ? (
                          <ErrorMessage>{formik.errors.material}</ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* serialNumber */}
                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="serialNumber"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Número de serie
                        </label>
                      </div>
                      <input
                        type="text"
                        id="serialNumber"
                        name="serialNumber"
                        value={formik.values.serialNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.serialNumber &&
                          formik.errors.serialNumber
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      <AnimatePresence>
                        {formik.touched.serialNumber &&
                        formik.errors.serialNumber ? (
                          <ErrorMessage>
                            {formik.errors.serialNumber}
                          </ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* status */}
                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="status"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Estado
                        </label>
                      </div>
                      <select
                        name=""
                        id="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.status && formik.errors.status
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="">SELECT</option>
                        {statusIvGeneral &&
                          statusIvGeneral.length > 0 &&
                          statusIvGeneral.map((op) => (
                            <option key={op.id} value={op.id}>
                              {op.name}
                            </option>
                          ))}
                      </select>
                      <AnimatePresence>
                        {formik.touched.status && formik.errors.status ? (
                          <ErrorMessage>{formik.errors.status}</ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* areaType */}
                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="areaType"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Tipo de área
                        </label>
                      </div>
                      <select
                        name=""
                        id="areaType"
                        value={formik.values.areaType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.areaType && formik.errors.areaType
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="">SELECT</option>
                        {typeArea &&
                          typeArea.length > 0 &&
                          typeArea.map((op) => (
                            <option key={op.id} value={op.id}>
                              {op.name}
                            </option>
                          ))}
                      </select>
                      <AnimatePresence>
                        {formik.touched.areaType && formik.errors.areaType ? (
                          <ErrorMessage>{formik.errors.areaType}</ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* areaDependency */}
                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="areaDependency"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Dependencia
                        </label>
                      </div>
                      <select
                        name=""
                        id="areaDependency"
                        value={formik.values.areaDependency}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.areaDependency &&
                          formik.errors.areaDependency
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="">SELECT</option>
                        {areaDependency &&
                          areaDependency.length > 0 &&
                          areaDependency.map((op) => (
                            <option key={op.id} value={op.id}>
                              {op.name}
                            </option>
                          ))}
                      </select>
                      <AnimatePresence>
                        {formik.touched.areaDependency &&
                        formik.errors.areaDependency ? (
                          <ErrorMessage>
                            {formik.errors.areaDependency}
                          </ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* location */}
                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="location"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Ubicación
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
                      <AnimatePresence>
                        {formik.touched.location && formik.errors.location ? (
                          <ErrorMessage>{formik.errors.location}</ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* assetType */}
                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="assetType"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Tipo de activo
                        </label>
                      </div>
                      <select
                        name=""
                        id="assetType"
                        value={formik.values.assetType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.assetType && formik.errors.assetType
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="">SELECT</option>
                        {assetType &&
                          assetType.length > 0 &&
                          assetType.map((op) => (
                            <option key={op.id} value={op.id}>
                              {op.name}
                            </option>
                          ))}
                      </select>
                      <AnimatePresence>
                        {formik.touched.assetType && formik.errors.assetType ? (
                          <ErrorMessage>{formik.errors.assetType}</ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* quantity */}
                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="quantity"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Cantidad
                        </label>
                      </div>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.quantity && formik.errors.quantity
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      <AnimatePresence>
                        {formik.touched.quantity && formik.errors.quantity ? (
                          <ErrorMessage>{formik.errors.quantity}</ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* responsable */}
                    <div>
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
                    </div>

                    {/* othersDetails */}
                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="othersDetails"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Detalles adicionales
                        </label>
                      </div>
                      <input
                        type="text"
                        id="othersDetails"
                        name="othersDetails"
                        value={formik.values.othersDetails}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.othersDetails &&
                          formik.errors.othersDetails
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      <AnimatePresence>
                        {formik.touched.othersDetails &&
                        formik.errors.othersDetails ? (
                          <ErrorMessage>
                            {formik.errors.othersDetails}
                          </ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* acquisitionDate */}
                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="acquisitionDate"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Fecha de adquisición
                        </label>
                      </div>
                      <input
                        type="date"
                        id="acquisitionDate"
                        name="acquisitionDate"
                        value={formik.values.acquisitionDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.acquisitionDate &&
                          formik.errors.acquisitionDate
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      <AnimatePresence>
                        {formik.touched.acquisitionDate &&
                        formik.errors.acquisitionDate ? (
                          <ErrorMessage>
                            {formik.errors.acquisitionDate}
                          </ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* purchaseValue */}
                    <div>
                      <div className="flex items-center">
                        <label
                          htmlFor="purchaseValue"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Valor de compra
                        </label>
                      </div>
                      <input
                        type="number"
                        id="purchaseValue"
                        name="purchaseValue"
                        value={formik.values.purchaseValue}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                          formik.touched.purchaseValue &&
                          formik.errors.purchaseValue
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      <AnimatePresence>
                        {formik.touched.purchaseValue &&
                        formik.errors.purchaseValue ? (
                          <ErrorMessage>
                            {formik.errors.purchaseValue}
                          </ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* warranty */}
                    <div>
                      <div className="flex items-center ">
                        <input
                          type="checkbox"
                          id="warranty"
                          name="warranty"
                          checked={formik.values.warranty}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`mr-2 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                            formik.touched.warranty && formik.errors.warranty
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        />
                        <label
                          htmlFor="warranty"
                          className="block font-semibold text-md md:text-lg"
                        >
                          Garantía
                        </label>
                      </div>
                      <AnimatePresence>
                        {formik.touched.warranty && formik.errors.warranty ? (
                          <ErrorMessage>{formik.errors.warranty}</ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* warrantyPeriod */}
                    {formik.values.warranty && (
                      <div>
                        <div className="flex items-center">
                          <label
                            htmlFor="warrantyPeriod"
                            className="block font-semibold text-md md:text-lg"
                          >
                            Periodo de garantía
                          </label>
                        </div>
                        <input
                          type="text"
                          id="warrantyPeriod"
                          name="warrantyPeriod"
                          value={formik.values.warrantyPeriod}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={` w-full p-2 mt-1 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-200 ${
                            formik.touched.warrantyPeriod &&
                            formik.errors.warrantyPeriod
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        />
                        <AnimatePresence>
                          {formik.touched.warrantyPeriod &&
                          formik.errors.warrantyPeriod ? (
                            <ErrorMessage>
                              {formik.errors.warrantyPeriod}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    )}
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
                      {isUpdate ? "Actualizar" : "Crear"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </section>
      )}
      ;
    </>
  );
};
export default ModalFormGeneralItems;
