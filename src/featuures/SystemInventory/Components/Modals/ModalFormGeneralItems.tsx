import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
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
import { IItemsGeneral } from "../../Models/IItemsGeneral";
import { FormatDate } from "@/utils/FormatDate";
import FormModal from "@/components/common/Ui/FormModal";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";

interface IModalFormGeneralItemsProps {
  idSede?: number | null;
  tipoItem?: "inventario/general";
  isUpdate?: boolean;
  refreshItems: () => void;
  items: IItemsGeneral | null;
}

const ModalFormGeneralItems: React.FC<IModalFormGeneralItemsProps> = ({
  idSede,
  items,
  isUpdate,
  refreshItems,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // clasificacion
  const { classification } = useFetchClassification();

  const { asset, fetchData } = useFetchAsset();

  const { materials } = useFetchMaterials();

  const { statusIvGeneral } = useFetchStatusIvGeneral();

  const { typeArea } = useTypeArea();

  const { assetType } = useFetchAssetType();

  const { areaDependency } = useFetchAreaDependency();

  const { createItem, updateItem, error, loading } = useCreateItemIvGeneral();

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
    inventoryNumber: Yup.string()
      .required("El número de inventario es requerido")
      .max(
        150,
        "El número de inventario debe tener como máximo 150 caracteres"
      ),
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
      inventoryNumber: "",
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
        formData.append("inventoryNumber", values.inventoryNumber);

        const response =
          items === null
            ? await createItem(formData)
            : await updateItem(formData, items?.id || 0);

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
          setTimeout(() => {
            setIsOpen(false);
            if (items === null) formik.resetForm();
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

  useEffect(() => {
    if (items && isUpdate) {
      formik.setValues({
        name: items.name,
        classification: items.classificationId.toString(),
        asset: items.assetId.toString(),
        brand: items.brand,
        model: items.model,
        material: items.materialId.toString(),
        serialNumber: items.serialNumber,
        status: items.statusId.toString(),
        areaType: items.areaTypeId.toString(),
        areaDependency: items.dependencyAreaId.toString(),
        location: items.location,
        assetType: items.assetTypeId.toString(),
        quantity: items.quantity,
        responsable: items.assetTypeId.toString(),
        othersDetails: items.otherDetails,
        acquisitionDate: FormatDate(items.acquisitionDate, false),
        purchaseValue: items.purchaseValue,
        warranty: !!items.warranty,
        warrantyPeriod: items.warrantyPeriod || "",
        inventoryNumber: items.inventoryNumber || "",
      });
    }
  }, [items, isUpdate]);

  return (
    <>
      <div className="relative group">
        <Button type="button" variant="outline" onClick={() => setIsOpen(true)}>
          {isUpdate ? (
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
        </Button>
        <div className="absolute z-10 px-2 py-1 text-sm text-white transition-opacity duration-200 transform translate-y-1 bg-gray-800 rounded-md opacity-0 pointer-events-none -translate-x-14 w-28 left-1/2 group-hover:opacity-100 dark:bg-gray-900">
          {isUpdate ? "Actualizar Item" : "Crear Item"}
          <div className="absolute z-10 w-3 h-3 transform rotate-45 -translate-x-1/2 bg-gray-800 bottom-[22px] left-1/2 dark:bg-gray-900"></div>
        </div>
      </div>

      {/* container-body */}
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Crear Item General"
        onSubmit={formik.handleSubmit}
        isSubmitting={loading}
        isValid={formik.isValid}
        size="lg"
        submitText="Crear"
      >
        <div className="grid grid-cols-3 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-center w-full">
            <Input
              type="text"
              id="name"
              name="name"
              label="Nombre Del Item"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.name}
              error={formik.errors.name}
              required
            />
          </div>

          <div>
            <Select
              options={
                classification
                  ? classification.map((op) => ({
                      value: op.id,
                      label: op.name,
                    }))
                  : []
              }
              label="Clasificación"
              name="classification"
              id="classification"
              value={formik.values.classification}
              onChange={(e) => {
                formik.setFieldValue("classification", e.target.value);
                fetchData(e.target.value);
              }}
              onBlur={formik.handleBlur}
              touched={formik.touched.classification}
              error={formik.errors.classification}
              required
            />
          </div>

          <div>
            <Select
              options={
                asset
                  ? asset.map((op) => ({
                      value: op.id,
                      label: op.name,
                    }))
                  : []
              }
              label="Activo"
              name="asset"
              id="asset"
              value={formik.values.asset}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.asset}
              error={formik.errors.asset}
              required
            />
          </div>

          {/* brand */}
          <div>
            <Input
              type="text"
              id="brand"
              name="brand"
              label="Marca"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.brand}
              error={formik.errors.brand}
              required
            />
          </div>

          {/* model */}
          <div>
            <Input
              type="text"
              id="model"
              name="model"
              label="Modelo"
              value={formik.values.model}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.model}
              error={formik.errors.model}
              required
            />
          </div>

          {/* material */}
          <div>
            <Select
              options={
                materials
                  ? materials.map((op) => ({
                      value: op.id,
                      label: op.name,
                    }))
                  : []
              }
              label="Material"
              name="material"
              id="material"
              value={formik.values.material}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.material}
              error={formik.errors.material}
              required
            />
          </div>

          {/* serialNumber */}
          <div>
            <Input
              type="text"
              id="serialNumber"
              name="serialNumber"
              label="Número de serie"
              value={formik.values.serialNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.serialNumber}
              error={formik.errors.serialNumber}
              required
            />
          </div>

          {/* status */}
          <div>
            <Select
              options={
                statusIvGeneral.map((op) => ({
                  value: op.id,
                  label: op.name,
                })) || []
              }
              label="Estado"
              name="status"
              id="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.status}
              error={formik.errors.status}
              required
            />
          </div>

          {/* areaType */}
          <div>
            <Select
              options={
                typeArea.map((op) => ({
                  value: op.id,
                  label: op.name,
                })) || []
              }
              label="Tipo de área"
              name="areaType"
              id="areaType"
              value={formik.values.areaType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.areaType}
              error={formik.errors.areaType}
              required
            />
          </div>

          {/* areaDependency */}
          <div>
            <Select
              options={
                areaDependency
                  ? areaDependency.map((op) => ({
                      value: op.id,
                      label: op.name,
                    }))
                  : []
              }
              label="Dependencia"
              name="areaDependency"
              id="areaDependency"
              value={formik.values.areaDependency}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.areaDependency}
              touched={formik.touched.areaDependency}
              required
            />
          </div>

          {/* location */}
          <div>
            <Input
              type="text"
              id="location"
              name="location"
              label="Ubicación"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.location}
              error={formik.errors.location}
              required
            />
          </div>

          {/* assetType */}
          <div>
            <Select
              options={
                assetType
                  ? assetType.map((op) => ({
                      value: op.id,
                      label: op.name,
                    }))
                  : []
              }
              label="Tipo de activo"
              name="assetType"
              id="assetType"
              value={formik.values.assetType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.assetType}
              error={formik.errors.assetType}
              required
            />
          </div>

          {/* quantity */}
          <div>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              label="Cantidad"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.quantity}
              error={formik.errors.quantity}
              required
            />
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
                formik.errors.responsable && formik.touched.responsable
                  ? formik.errors.responsable
                  : undefined
              }
              touched={formik.touched.responsable}
              required={true}
              placeholder="Ej: Juan Perez"
            />
          </div>

          {/* othersDetails */}
          <div>
            <Input
              type="text"
              id="othersDetails"
              name="othersDetails"
              label="Detalles adicionales"
              value={formik.values.othersDetails}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.othersDetails}
              error={formik.errors.othersDetails}
              required
            />
          </div>

          <div>
            <Input
              type="date"
              id="acquisitionDate"
              name="acquisitionDate"
              label="Fecha de adquisición"
              value={formik.values.acquisitionDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.acquisitionDate}
              error={formik.errors.acquisitionDate}
              required
            />
          </div>

          {/* purchaseValue */}
          <div>
            <Input
              type="number"
              id="purchaseValue"
              name="purchaseValue"
              label="Valor de compra"
              value={formik.values.purchaseValue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.purchaseValue}
              error={formik.errors.purchaseValue}
              required
            />
          </div>

          {/* warranty */}
          <div>
            <Input
              type="checkbox"
              id="warranty"
              name="warranty"
              label="Garantía"
              checked={formik.values.warranty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.warranty}
              error={formik.errors.warranty}
              variant="checkbox"
            />
          </div>

          {/* warrantyPeriod */}
          {formik.values.warranty && (
            <div>
              <Input
                type="text"
                id="warrantyPeriod"
                name="warrantyPeriod"
                label="Periodo de garantía"
                value={formik.values.warrantyPeriod}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.warrantyPeriod}
                error={formik.errors.warrantyPeriod}
                required
              />
            </div>
          )}

          {/* inventoryNumber */}
          <div>
            <Input
              type="text"
              id="inventoryNumber"
              name="inventoryNumber"
              label="Número de inventario"
              value={formik.values.inventoryNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.inventoryNumber}
              error={formik.errors.inventoryNumber}
              required
            />
          </div>
        </div>

        {error && (
          <AnimatePresence>
            <ErrorMessage>{error}</ErrorMessage>
          </AnimatePresence>
        )}
      </FormModal>
    </>
  );
};
export default ModalFormGeneralItems;
