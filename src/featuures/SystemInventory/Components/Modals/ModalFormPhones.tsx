import React, { useEffect, useState } from "react";
import { IItemsPhone } from "../../Models/IItemsPhone";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "lucide-react";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import { useCreateItemPh } from "../../Hooks/useCreateItemPh";
import { toast } from "react-toastify";
import { FormatDate } from "@/utils/FormatDate";
import FormModal from "@/components/common/Ui/FormModal";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";

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

  const { handleCreateItem, handleUpdatePhone, error, loading } =
    useCreateItemPh();

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
    file: Yup.mixed()
      .nullable()
      .optional()
      .test("fileSize", "El archivo debe ser menor a 1MB", (value: any) => {
        if (value) {
          return value.size <= 1024 * 1024; // 1MB
        }
        return true; // Si no hay archivo, no se aplica la validación
      })
      .test("fileType", "Solo se pertiten archivos PDF", (value: any) => {
        if (value) {
          return value.type === "application/pdf";
        }
        return true;
      }),
    inventoryNumber: Yup.string()
      .required("El número de inventario es requerido")
      .min(3, "El número de inventario debe tener al menos 3 caracteres")
      .max(255, "El número de inventario debe tener maximo 255 caracteres"),
    sedeId: Yup.number().optional()
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
      file: null,
      sedeId: sedeId ? sedeId.toString() : "",
      inventoryNumber: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = items
          ? await handleUpdatePhone(values, items.id)
          : await handleCreateItem(values);

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
        console.log("error inesperado", error);
      }
    },
  });

  useEffect(() => {
    if (items) {
      formik.setValues({
        ...formik.values,
        name: items.name,
        brand: items.brand,
        model: items.model,
        serial: items.serial,
        imei: items.imei,
        operativeSystem: items.operativeSystem,
        versionSO: items.versionSO,
        storage: items.storage,
        storageRam: items.storageRam,
        phoneNumber: items.phoneNumber,
        operador: items.operador,
        typePlan: items.typePlan,
        dueDatePlan: FormatDate(items.dueDatePlan, false),
        macWifi: items.macWifi,
        addressBluetooth: items.addressBluetooth,
        purchaseDate: FormatDate(items.purchaseDate, false),
        warrantyTime: items.warrantyTime,
        warranty: !!items.warranty,
        responsable: items.responsableId,
        caseProtector: !!items.protectorCase,
        tenperedGlass: !!items.temperedGlass,
        observations: items.observation,
        acquisitionValue: parseInt(items.acquisitionValue, 10),
        deliveryDate: FormatDate(items.deliveryDate, false),
        status: items.status,
        inventoryNumber: items.inventoryNumber,
        sedeId: items.sedeId ? items.sedeId.toString() : "",
      });
    }
  }, [items]);

  return (
    <>
      <div>
        <Button type="button" onClick={() => setIsOpen(true)}>
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
        </Button>
      </div>

      {/* container-body */}
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={items ? "Actualizar Item" : "Crear Item"}
        isSubmitting={loading}
        isValid={formik.isValid}
        onSubmit={formik.handleSubmit}
        submitText={items ? "Actualizar" : "Crear"}
      >
        <div className="max-h-[74vh] md:max-h-[70vh] overflow-y-auto dark:bg-gray-800 dark:text-gray-200">
          <div className="grid grid-cols-3 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="name"
                name="name"
                label="Nombre"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.name}
                error={formik.errors.name}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
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
            <div className="flex flex-col justify-center w-full">
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
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="serial"
                name="serial"
                label="Serial"
                value={formik.values.serial}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.serial}
                error={formik.errors.serial}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="imei"
                name="imei"
                label="IMEI"
                value={formik.values.imei}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.imei}
                error={formik.errors.imei}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="operativeSystem"
                name="operativeSystem"
                label="Sistema Operativo"
                value={formik.values.operativeSystem}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.operativeSystem}
                error={formik.errors.operativeSystem}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="versionSO"
                name="versionSO"
                label="Versión SO"
                value={formik.values.versionSO}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.versionSO}
                error={formik.errors.versionSO}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="storage"
                name="storage"
                label="Almacenamiento"
                value={formik.values.storage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.storage}
                error={formik.errors.storage}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="storageRam"
                name="storageRam"
                label="Almacenamiento RAM"
                value={formik.values.storageRam}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.storageRam}
                error={formik.errors.storageRam}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                label="Número de Teléfono"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.phoneNumber}
                error={formik.errors.phoneNumber}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="operador"
                name="operador"
                label="Operador"
                value={formik.values.operador}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.operador}
                error={formik.errors.operador}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="typePlan"
                name="typePlan"
                label="Tipo de Plan"
                value={formik.values.typePlan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.typePlan}
                error={formik.errors.typePlan}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="date"
                id="dueDatePlan"
                name="dueDatePlan"
                label="Fecha de Vencimiento del Plan"
                value={formik.values.dueDatePlan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.dueDatePlan}
                error={formik.errors.dueDatePlan}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="macWifi"
                name="macWifi"
                label="Dirección MAC Wifi"
                value={formik.values.macWifi}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.macWifi}
                error={formik.errors.macWifi}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="addressBluetooth"
                name="addressBluetooth"
                label="Dirección Bluetooth"
                value={formik.values.addressBluetooth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.addressBluetooth}
                error={formik.errors.addressBluetooth}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                label="Fecha de Compra"
                value={formik.values.purchaseDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.purchaseDate}
                error={formik.errors.purchaseDate}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
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
            {formik.values.warranty && (
              <div className="flex flex-col justify-center w-full">
                <Input
                  type="text"
                  id="warrantyTime"
                  name="warrantyTime"
                  label="Tiempo de Garantía"
                  value={formik.values.warrantyTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.warrantyTime}
                  error={formik.errors.warrantyTime}
                  required
                />
              </div>
            )}
            <div className="flex flex-col justify-center w-full">
              <Input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                label="Fecha de Entrega"
                value={formik.values.deliveryDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.deliveryDate}
                error={formik.errors.deliveryDate}
                required
              />
            </div>
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
            <div className="flex flex-col justify-center w-full">
              <Input
                type="checkbox"
                id="caseProtector"
                name="caseProtector"
                label="Protector de Carcasa"
                checked={formik.values.caseProtector}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.caseProtector}
                error={formik.errors.caseProtector}
                variant="checkbox"
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="checkbox"
                id="tenperedGlass"
                name="tenperedGlass"
                label="Protector de Pantalla"
                checked={formik.values.tenperedGlass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.tenperedGlass}
                error={formik.errors.tenperedGlass}
                variant="checkbox"
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="observations"
                name="observations"
                label="Observaciones"
                value={formik.values.observations}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.observations}
                error={formik.errors.observations}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Select
                id="status"
                name="status"
                label="Estado"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.status}
                error={formik.errors.status}
                required
                options={[
                  { value: "disponible", label: "Disponible" },
                  { value: "enUso", label: "En Uso" },
                  { value: "enMantenimiento", label: "En Mantenimiento" },
                  { value: "fueraDeServicio", label: "Fuera de Servicio" },
                ]}
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="acquisitionValue"
                name="acquisitionValue"
                label="Valor de Adquisición"
                value={formik.values.acquisitionValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.acquisitionValue}
                error={formik.errors.acquisitionValue}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="file"
                id="file"
                name="file"
                label="Archivo de entrega"
                onChange={(event) => {
                  const file = event.target.files
                    ? event.target.files[0]
                    : null;
                  formik.setFieldValue("file", file);
                }}
                onBlur={formik.handleBlur}
                accept=".pdf"
                touched={formik.touched.file}
                error={formik.errors.file}
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <Input
                type="text"
                id="inventoryNumber"
                name="inventoryNumber"
                label="Número de Inventario"
                value={formik.values.inventoryNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.inventoryNumber}
                error={formik.errors.inventoryNumber}
                required
              />
            </div>
            {sedeId === null && (
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

          {error && (
            <div className="flex items-center justify-center w-full p-2 text-sm font-semibold text-red-500 bg-red-100 border-2 border-red-500 rounded-md dark:bg-red-900 dark:text-red-200 dark:border-red-700">
              {error}
            </div>
          )}
        </div>
      </FormModal>
    </>
  );
};

export default ModalFormPhones;
