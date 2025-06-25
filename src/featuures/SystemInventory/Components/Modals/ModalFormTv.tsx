import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "lucide-react";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import { useCreateTv } from "../../Hooks/useCreateTv";
import { toast } from "react-toastify";
import { IItemsTv } from "../../Models/IItemsTv";
import { FormatDate } from "@/utils/FormatDate";
import FormModal from "@/components/common/Ui/FormModal";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";

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
    inventoryNumber: Yup.string().required("numero de inventario es requerido"),
    sedeId: Yup.string().optional()
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
      sedeId: sedeId ? sedeId.toString() : "",
      inventoryNumber: "",
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

  // completar datos si es actualizacion
  useEffect(() => {
    if (items) {
      formik.setValues({
        name: items.name,
        location: items.location,
        brand: items.brand,
        model: items.model,
        serial: items.serial,
        pulgadas: items.pulgadas.toString(),
        screenType: items.screenType,
        smartTv: !!items.smartTv,
        operativeSystem: items.operativeSystem,
        addressIp: items.addressIp,
        mac: items.mac,
        resolution: items.resolution,
        numPuertosHdmi: items.numPuertosHdmi,
        numPuertosUsb: items.numPuertosUsb,
        connectivity: items.connectivity,
        purchaseDate: FormatDate(items.purchaseDate, false),
        warrantyTime: items.warrantyTime,
        warranty: !!items.warranty,
        deliveryDate: FormatDate(items.deliveryDate, false),
        observation: items.observations,
        status: items.status,
        acquisitionValue: Number(items.acquisitionValue),
        controlRemote: !!items.controlRemote,
        utility: items.utility,
        responsable: items.responsableId.toString(),
        sedeId: sedeId ? sedeId.toString() : items.sedeId.toString(),
        inventoryNumber: items.inventoryNumber,
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

      {/* contenido */}
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={items ? "Actualizar TV" : "Crear TV"}
        isSubmitting={loading}
        isValid={formik.isValid}
        size="lg"
        onSubmit={formik.handleSubmit}
        submitText={items ? "Actualizar" : "Crear"}
      >
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

          <InputAutocompletado
            label="Responsable"
            onInputChanged={(value) =>
              formik.setFieldValue("responsable", value)
            }
            apiRoute="search-user-by-name"
            error={
              formik.touched.responsable && formik.errors.responsable
                ? formik.errors.responsable
                : undefined
            }
            touched={formik.touched.responsable}
            placeholder="Ej: Juan Perez"
          />

          <div className="flex flex-col justify-center w-full">
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
              id="pulgadas"
              name="pulgadas"
              label="Pulgadas"
              value={formik.values.pulgadas}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.pulgadas}
              error={formik.errors.pulgadas}
              required
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <Select
              id="screenType"
              name="screenType"
              label="Tipo de Pantalla"
              value={formik.values.screenType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.screenType}
              error={formik.errors.screenType}
              required
              options={[
                { value: "", label: "Seleccione el tipo de pantalla" },
                { value: "LCD", label: "LCD" },
                { value: "LED", label: "LED" },
                { value: "OLED", label: "OLED" },
                { value: "QLED", label: "QLED" },
                { value: "AMOLED", label: "AMOLED" },
                { value: "Plasma", label: "Plasma" },
                { value: "MicroLED", label: "MicroLED" },
              ]}
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <Input
              type="checkbox"
              id="smartTv"
              name="smartTv"
              label="Smart TV"
              checked={formik.values.smartTv}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.smartTv}
              error={formik.errors.smartTv}
              variant="checkbox"
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <Select
              id="operativeSystem"
              name="operativeSystem"
              label="Sistema Operativo"
              value={formik.values.operativeSystem}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.operativeSystem}
              error={formik.errors.operativeSystem}
              required
              options={[
                { value: "", label: "Seleccione el sistema operativo" },
                { value: "Windows", label: "Windows" },
                { value: "macOS", label: "macOS" },
                { value: "Linux", label: "Linux" },
                { value: "Android", label: "Android" },
                { value: "iOS", label: "iOS" },
                { value: "Chrome OS", label: "Chrome OS" },
                { value: "Unix", label: "Unix" },
                { value: "FreeBSD", label: "FreeBSD" },
                { value: "OpenBSD", label: "OpenBSD" },
                { value: "Solaris", label: "Solaris" },
                { value: "Other", label: "Otro" },
              ]}
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <Input
              type="text"
              id="addressIp"
              name="addressIp"
              label="Dirección IP"
              value={formik.values.addressIp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.addressIp}
              error={formik.errors.addressIp}
              required
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <Input
              type="text"
              id="mac"
              name="mac"
              label="MAC"
              value={formik.values.mac}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.mac}
              error={formik.errors.mac}
              required
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <Input
              type="text"
              id="resolution"
              name="resolution"
              label="Resolución"
              value={formik.values.resolution}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.resolution}
              error={formik.errors.resolution}
              required
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <Input
              type="number"
              id="numPuertosHdmi"
              name="numPuertosHdmi"
              label="Número de Puertos HDMI"
              value={formik.values.numPuertosHdmi}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.numPuertosHdmi}
              error={formik.errors.numPuertosHdmi}
              required
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <Input
              type="number"
              id="numPuertosUsb"
              name="numPuertosUsb"
              label="Número de Puertos USB"
              value={formik.values.numPuertosUsb}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.numPuertosUsb}
              error={formik.errors.numPuertosUsb}
              required
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <Input
              type="text"
              id="connectivity"
              name="connectivity"
              label="Conectividad"
              value={formik.values.connectivity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.connectivity}
              error={formik.errors.connectivity}
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

          <div className="flex flex-col justify-center w-full">
            <Input
              type="text"
              id="observation"
              name="observation"
              label="Observación"
              value={formik.values.observation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.observation}
              error={formik.errors.observation}
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
                { value: "", label: "Seleccione el estado" },
                { value: "Activo", label: "Activo" },
                { value: "Inactivo", label: "Inactivo" },
                { value: "En Mantenimiento", label: "En Mantenimiento" },
              ]}
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <Input
              type="number"
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
              type="checkbox"
              id="controlRemote"
              name="controlRemote"
              label="Control Remoto"
              checked={formik.values.controlRemote}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.controlRemote}
              error={formik.errors.controlRemote}
              variant="checkbox"
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <Input
              type="text"
              id="utility"
              name="utility"
              label="Utilidad"
              value={formik.values.utility}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.utility}
              error={formik.errors.utility}
              required
            />
          </div>
          <div className="flex flex-col justify-center w-full p-4">
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
      </FormModal>
    </>
  );
};

export default ModalFormTv;
