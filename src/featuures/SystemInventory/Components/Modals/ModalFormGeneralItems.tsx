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
import { toast } from "react-toastify";
import { useFetchAreaDependency } from "../../Hooks/useFetchAreaDependency";
import { IItemsGeneral } from "../../Models/IItemsGeneral";
import { FormatDate } from "@/utils/FormatDate";
import FormModal from "@/components/common/Ui/FormModal";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { useStoreGeneral } from "../../Store/useStoreGeneral";

interface IModalFormGeneralItemsProps {
  idSede?: number | null;
  tipoItem?: string;
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

  const { createGeneral, updateGeneral, error, isLoading } = useStoreGeneral();

  const schemaValidation = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    classificationId: Yup.string().required("La clasificación es requerida"),
    assetId: Yup.string().required("El activo es requerido"),
    brand: Yup.string().optional(),
    model: Yup.string().optional(),
    materialId: Yup.string().required("El material es requerido"),
    serialNumber: Yup.string().optional(),
    statusId: Yup.string().required("El estado es requerido"),
    areaTypeId: Yup.string().required("El tipo de área es requerido"),
    dependencyAreaId: Yup.string().required("La dependencia es requerida"),
    location: Yup.string().required("La ubicación es requerida"),
    assetTypeId: Yup.string().required("El tipo de activo es requerido"),
    quantity: Yup.number().required("La cantidad es requerida"),
    responsableId: Yup.string().required("El responsable es requerido"),
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
    headquartersId: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      classificationId: "",
      assetId: "",
      brand: "",
      model: "",
      materialId: "",
      serialNumber: "",
      statusId: "",
      areaTypeId: "",
      dependencyAreaId: "",
      location: "",
      assetTypeId: "",
      quantity: 0,
      responsableId: "",
      othersDetails: "",
      acquisitionDate: "",
      purchaseValue: "",
      warranty: false,
      warrantyPeriod: "",
      inventoryNumber: "",
      headquartersId: idSede?.toString() || "",
    },
    validationSchema: schemaValidation,
    onSubmit: async (values) => {
      items === null
        ? await createGeneral(values, () => {
          formik.resetForm();
          toast.success("Item creado con éxito");
          setIsOpen(false);
          refreshItems();
        })
        : await updateGeneral(items?.id || 0, values, () => {
          toast.success("Item actualizado con éxito");
          setIsOpen(false);
          refreshItems();
        });
    },
  });

  useEffect(() => {
    if (items && isUpdate) {
      formik.setValues({
        name: items.name,
        classificationId: items.classificationId.toString(),
        assetId: items.assetId.toString(),
        brand: items.brand,
        model: items.model,
        materialId: items.materialId.toString(),
        serialNumber: items.serialNumber,
        statusId: items.statusId.toString(),
        areaTypeId: items.areaTypeId.toString(),
        dependencyAreaId: items.dependencyAreaId.toString(),
        location: items.location,
        assetTypeId: items.assetTypeId.toString(),
        quantity: items.quantity,
        responsableId: items.assetTypeId.toString(),
        othersDetails: items.otherDetails,
        acquisitionDate: FormatDate(items.acquisitionDate, false),
        purchaseValue: items.purchaseValue,
        warranty: !!items.warranty,
        warrantyPeriod: items.warrantyPeriod || "",
        inventoryNumber: items.inventoryNumber || "",
        headquartersId: items.headquartersId?.toString() || "",
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
          <div className="absolute z-10 w-3 h-3 transform rotate-45 -translate-x-1/2 bg-gray-800 bottom-5.5 left-1/2 dark:bg-gray-900"></div>
        </div>
      </div>

      {/* container-body */}
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Crear Item General"
        onSubmit={formik.handleSubmit}
        isSubmitting={isLoading}
        isValid={formik.isValid}
        size="lg"
        submitText={isUpdate ? "Actualizar" : "Crear"}
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
              name="classificationId"
              id="classificationId"
              value={formik.values.classificationId}
              onChange={(e) => {
                formik.setFieldValue("classificationId", e.target.value);
                fetchData(e.target.value);
              }}
              onBlur={formik.handleBlur}
              touched={formik.touched.classificationId}
              error={formik.errors.classificationId}
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
              name="assetId"
              id="assetId"
              value={formik.values.assetId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.assetId}
              error={formik.errors.assetId}
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

          {/* materialId */}
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
              name="materialId"
              id="materialId"
              value={formik.values.materialId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.materialId}
              error={formik.errors.materialId}
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

          {/* statusId */}
          <div>
            <Select
              options={
                statusIvGeneral.map((op) => ({
                  value: op.id,
                  label: op.name,
                })) || []
              }
              label="Estado"
              name="statusId"
              id="statusId"
              value={formik.values.statusId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.statusId}
              error={formik.errors.statusId}
              required
            />
          </div>

          {/* areaTypeId */}
          <div>
            <Select
              options={
                typeArea.map((op) => ({
                  value: op.id,
                  label: op.name,
                })) || []
              }
              label="Tipo de área"
              name="areaTypeId"
              id="areaTypeId"
              value={formik.values.areaTypeId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.areaTypeId}
              error={formik.errors.areaTypeId}
              required
            />
          </div>

          {/* dependencyAreaId */}
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
              name="dependencyAreaId"
              id="dependencyAreaId"
              value={formik.values.dependencyAreaId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.dependencyAreaId}
              touched={formik.touched.dependencyAreaId}
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

          {/* assetTypeId */}
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
              name="assetTypeId"
              id="assetTypeId"
              value={formik.values.assetTypeId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.assetTypeId}
              error={formik.errors.assetTypeId}
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

          {/* responsableId */}
          <div>
            <InputAutocompletado
              label="Responsable"
              onInputChanged={(value) =>
                formik.setFieldValue("responsableId", value)
              }
              apiRoute="search-user-by-name"
              error={
                formik.errors.responsableId && formik.touched.responsableId
                  ? formik.errors.responsableId
                  : undefined
              }
              touched={formik.touched.responsableId}
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
          {idSede === null && (
            <div>
              <InputAutocompletado
                label="Sede"
                onInputChanged={(value) =>
                  formik.setFieldValue("headquartersId", value)
                }
                apiRoute="lugares-radicacion-name"
                placeholder="Ej: Sede 15"
                error={
                  formik.touched.headquartersId && formik.errors.headquartersId
                    ? formik.errors.headquartersId
                    : undefined
                }
                touched={formik.touched.headquartersId}
                helpText="Si actualiza este campo, se actualizará la sede donde se aloja el ítem, por lo tanto, se moverá a esa sede."
              />
            </div>
          )}
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
