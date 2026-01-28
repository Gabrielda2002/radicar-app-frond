//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import inventoryOptions from "@/data-dynamic/inventoryOptions.json";

//*Icons
import {
  SquaresPlusIcon,
  TagIcon,
  InformationCircleIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  SwatchIcon,
  CircleStackIcon,
  WifiIcon,
  CodeBracketIcon,
  KeyIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import Select, { SelectOption } from "@/components/common/Ui/Select";
import InputAutoCompleteJson from "@/components/common/Ui/InputAutoCompleteJson";
import { useCreateAcceosry } from "../../Hooks/useCreateAccesory";

interface ModalAccesorioItemProps {
  id: number;
  refreshItems: () => void;
}

const ModalAccesorioItem: React.FC<ModalAccesorioItemProps> = ({
  id,
  refreshItems,
}) => {
  const [stadopen, setStadopen] = useState(false);

  const { createAccesory, error, loading } = useCreateAcceosry();

  // estado para controlar que se va a agregar al equipo
  const baseValidationSchema = {
    typeAdd: Yup.string(),
    name: Yup.string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(200, "El nombre debe tener como máximo 200 caracteres"),
    othersData: Yup.string()
      .required("La descripción es requerida")
      .min(3, "La descripción debe tener al menos 3 caracteres")
      .max(200, "La descripción debe tener como máximo 200 caracteres"),
    brand: Yup.string().when("typeAdd", {
      is: (value: string) => value === "Periferico" || value === "hardware",
      then: (schema) => schema.required("El codigo es requerido"),
      otherwise: (schema) => schema.optional(),
    }),

    serial: Yup.string().when("typeAdd", {
      is: (value: string) => value === "Periferico" || value === "hardware",
      then: (schema) =>
        schema
          .required("El serial es requerido")
          .min(3, "El serial debe tener al menos 3 caracteres")
          .max(200, "El serial debe tener como máximo 200 caracteres"),
      otherwise: (schema) => schema.optional(),
    }),

    model: Yup.string().when("typeAdd", {
      is: (value: string) => value === "Periferico" || value === "hardware",
      then: (schema) =>
        schema
          .required("El modelo es requerido")
          .min(3, "El modelo debe tener al menos 3 caracteres")
          .max(200, "El modelo debe tener como máximo 200 caracteres"),
      otherwise: (schema) => schema.optional(),
    }),

    version: Yup.string().when("typeAdd", {
      is: (value: string) => value === "software",
      then: (schema) =>
        schema
          .required("La versión es requerida")
          .min(3, "La versión debe tener al menos 3 caracteres")
          .max(200, "La versión debe tener como máximo 200 caracteres"),
      otherwise: (schema) => schema.optional(),
    }),
    license: Yup.string().when("typeAdd", {
      is: (value: string) => value === "software",
      then: (schema) =>
        schema
          .required("La versión es requerida")
          .min(3, "La versión debe tener al menos 3 caracteres")
          .max(200, "La versión debe tener como máximo 200 caracteres"),
      otherwise: (schema) => schema.optional(),
    }),
    dateInstallation: Yup.date().when("typeAdd", {
      is: (value: string) => value === "software",
      then: (schema) => schema.required("El codigo es requerido"),
      otherwise: (schema) => schema.optional(),
    }),
    status: Yup.string().when("typeAdd", {
      is: (value: string) => value === "Periferico" || value === "software",
      then: (schema) => schema.required("El codigo es requerido"),
      otherwise: (schema) => schema.optional(),
    }),
    capacity: Yup.string().when("typeAdd", {
      is: (value: string) => value === "hardware",
      then: (schema) =>
        schema
          .required("La capacidad es requerida")
          .min(3, "La capacidad debe tener al menos 3 caracteres")
          .max(200, "La capacidad debe tener como máximo 200 caracteres"),
      otherwise: (schema) => schema.optional(),
    }),
    speed: Yup.string().when("typeAdd", {
      is: (value: string) => value === "hardware",
      then: (schema) => schema.required("El codigo es requerido"),
      otherwise: (schema) => schema.optional(),
    }),
    inventoryNumber: Yup.string().when("typeAdd", {
      is: (value: string) => value === "Periferico",
      then: (schema) =>
        schema
          .required("El número de inventario es requerido")
          .min(3, "El número de inventario debe tener al menos 3 caracteres")
          .max(
            200,
            "El número de inventario debe tener como máximo 200 caracteres"
          ),
      otherwise: (schema) => schema.optional(),
    }),
  };

  const formik = useFormik({
    initialValues: {
      typeAdd: "",
      name: "",
      brand: "",
      serial: "",
      model: "",
      version: "",
      license: "",
      dateInstallation: "",
      status: "",
      capacity: "",
      speed: "",
      othersData: "",
      inventoryNumber: "",
    },
    validationSchema: Yup.object(baseValidationSchema),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("otherData", values.othersData);
        formData.append("equipmentId", id.toString());

        let ep: string = "";

        if (values.typeAdd === "Periferico" || values.typeAdd === "hardware") {
          formData.append("brand", values.brand);
          formData.append("serial", values.serial);
          formData.append("model", values.model);
        }
        if (values.typeAdd === "software") {
          ep = "software";
          formData.append("version", values.version);
          formData.append("license", values.license);
          formData.append("dateInstallation", values.dateInstallation);
          formData.append("status", values.status);
        }
        if (values.typeAdd === "hardware") {
          ep = "componentes";
          formData.append("capacity", values.capacity);
          formData.append("speed", values.speed);
        }
        if (values.typeAdd === "Periferico") {
          ep = "accesorios-equipos";
          formData.append("status", values.status);
          formData.append("inventoryNumber", values.inventoryNumber);
        }

        const response = await createAccesory(formData, ep);

        if (response?.status === 200 || response?.status === 201) {
          formik.resetForm();
          refreshItems();
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
            setStadopen(false);
          }, 3000);
        }
      } catch (error) {
        console.log("Error al crear el accesorio:", error);
      }
    },
  });

  // Opciones para los selects de estado
  const statusOptions: SelectOption[] = [
    { value: "NUEVO", label: "Nuevo" },
    { value: "REGULAR", label: "Regular" },
    { value: "MALO", label: "Malo" },
  ];

  // Opciones para el select de tipo de accesorio
  const typeAddOptions: SelectOption[] = [
    { value: "Periferico", label: "Periferico" },
    { value: "hardware", label: "Hardware" },
    { value: "software", label: "Software" },
  ];

  return (
    <>
      <div className="relative group">
        <button
          className="p-2 duration-200 border rounded-md hover:bg-gray-200 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
          onClick={() => setStadopen(true)}
        >
          <SquaresPlusIcon className="w-7 h-7" />
        </button>
        {/* Tooltip */}
        <div className="absolute z-10 px-2 py-1 text-sm text-white transition-opacity duration-200 transform -translate-x-1/2 translate-y-1 bg-gray-800 rounded-md opacity-0 pointer-events-none w-33.5 left-1/2 group-hover:opacity-100 dark:bg-gray-900">
          Agregar Accesorio
          {/* Flechita indicativa */}
          <div className="absolute z-0 w-3 h-3 transform rotate-45 -translate-x-1/2 bg-gray-800 bottom-5.5 left-1/2 dark:bg-gray-900"></div>
        </div>
      </div>

      <FormModal
        isOpen={stadopen}
        onClose={() => setStadopen(false)}
        title="Agregar Accesorio"
        onSubmit={formik.handleSubmit}
        isSubmitting={loading}
        showCancelButton
        submitText="Guardar"
        isValid={formik.isValid && formik.dirty}
      >
        <div className="p-8">
          <div className="flex mb-8">
            <Select
              label="Tipo de Accesorio"
              name="typeAdd"
              value={formik.values.typeAdd}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={typeAddOptions}
              required
              selectSize="md"
              // No error/touched porque no es formik
              className="w-50"
            />
          </div>
          <section className="grid grid-cols-2 gap-x-7">
            {/* validar que va crear el usuario y en base a esa seleccion mostrar el fomrulario correspondiente */}
            {formik.values.typeAdd && (
              <>
                <InputAutoCompleteJson
                  data={
                    formik.values.typeAdd === "hardware"
                      ? inventoryOptions.hardware
                      : formik.values.typeAdd === "software"
                      ? inventoryOptions.software
                      : formik.values.typeAdd === "Periferico"
                      ? inventoryOptions.periferico
                      : []
                  }
                  label="Nombre"
                  error={formik.errors.name}
                  touched={formik.touched.name}
                  required
                  onSelect={(value) => formik.setFieldValue("name", value)}
                  placeholder="Ej: Mouse"
                />
                <Input
                  label="Otros Datos"
                  name="othersData"
                  value={formik.values.othersData}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.othersData}
                  touched={formik.touched.othersData}
                  required
                  size="md"
                  icon={
                    <InformationCircleIcon className="w-5 h-5 dark:text-white" />
                  }
                  placeholder="Ej: Descripción del accesorio"
                />
              </>
            )}
            {(formik.values.typeAdd === "Periferico" ||
              formik.values.typeAdd === "hardware") && (
              <Input
                label="Marca"
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.brand}
                touched={formik.touched.brand}
                required
                size="md"
                icon={<PuzzlePieceIcon className="w-5 h-5 dark:text-white" />}
                placeholder="Ej: Logitech"
              />
            )}
            {(formik.values.typeAdd === "Periferico" ||
              formik.values.typeAdd === "hardware") && (
              <Input
                label="Serial"
                name="serial"
                value={formik.values.serial}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.serial}
                touched={formik.touched.serial}
                required
                size="md"
                icon={<ShieldCheckIcon className="w-5 h-5 dark:text-white" />}
                placeholder="Ej: 1234567890"
              />
            )}
            {(formik.values.typeAdd === "Periferico" ||
              formik.values.typeAdd === "hardware") && (
              <Input
                label="Modelo"
                name="model"
                value={formik.values.model}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.model}
                touched={formik.touched.model}
                required
                size="md"
                icon={<SwatchIcon className="w-5 h-5 dark:text-white" />}
                placeholder="Ej: Modelo del accesorio"
              />
            )}
            {formik.values.typeAdd === "software" && (
              <Input
                label="Versión"
                name="version"
                value={formik.values.version}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.version}
                touched={formik.touched.version}
                required
                size="md"
                icon={<CodeBracketIcon className="w-5 h-5 dark:text-white" />}
                placeholder="Ej: 1.0.0"
              />
            )}
            {formik.values.typeAdd === "software" && (
              <Input
                label="Licencia"
                name="license"
                value={formik.values.license}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.license}
                touched={formik.touched.license}
                required
                size="md"
                icon={<KeyIcon className="w-5 h-5 dark:text-white" />}
                placeholder="Ej: Licencia del software"
              />
            )}
            {formik.values.typeAdd === "software" && (
              <Input
                label="Fecha de Instalación"
                name="dateInstallation"
                type="date"
                value={formik.values.dateInstallation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.dateInstallation}
                touched={formik.touched.dateInstallation}
                required
                size="md"
                icon={<CalendarIcon className="w-5 h-5 dark:text-white" />}
              />
            )}
            {formik.values.typeAdd === "software" && (
              <Select
                label="Estado"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.status}
                touched={formik.touched.status}
                required
                options={statusOptions}
                selectSize="md"
                className="w-full"
              />
            )}
            {formik.values.typeAdd === "hardware" && (
              <Input
                label="Capacidad"
                name="capacity"
                value={formik.values.capacity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.capacity}
                touched={formik.touched.capacity}
                required
                size="md"
                icon={<CircleStackIcon className="w-5 h-5 dark:text-white" />}
                placeholder="Ej: 500GB, 1TB, etc."
              />
            )}
            {formik.values.typeAdd === "hardware" && (
              <Input
                label="Velocidad"
                name="speed"
                value={formik.values.speed}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.speed}
                touched={formik.touched.speed}
                required
                size="md"
                icon={<WifiIcon className="w-5 h-5 dark:text-white" />}
                placeholder="Ej: 2.4GHz, 5GHz, etc."
              />
            )}
            {formik.values.typeAdd === "Periferico" && (
              <Select
                label="Estado"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.status}
                touched={formik.touched.status}
                required
                options={statusOptions}
                selectSize="md"
                className="w-50"
              />
            )}
            {formik.values.typeAdd === "Periferico" && (
              <Input
                label="Número de Inventario"
                name="inventoryNumber"
                value={formik.values.inventoryNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.inventoryNumber}
                touched={formik.touched.inventoryNumber}
                required
                size="md"
                icon={<TagIcon className="w-5 h-5 dark:text-white" />}
                placeholder="Ej: INV-1234567890"
              />
            )}
          </section>
        </div>
        <AnimatePresence>
          {error && (
            <div>
              <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                {error}
              </div>
            </div>
          )}
        </AnimatePresence>
      </FormModal>
    </>
  );
};

export default ModalAccesorioItem;
