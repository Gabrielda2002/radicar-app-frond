import React, { useState } from "react";
import { ModalConfigBalanceProps } from "../Types/IBalancesVacations";
import FormModal from "@/components/common/Ui/FormModal";
import * as Yup from "yup";
import { useFormik, FieldArray } from "formik";
import Input from "@/components/common/Ui/Input";
import Button from "@/components/common/Ui/Button";

const ModalConfigBalance: React.FC<ModalConfigBalanceProps> = ({
  balances,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // lo que el backend espera para la configuracion de balance es un array de objetos donde el objeto tiene { balanceId: number, diasTomandos: number, notas: string}

  // validacion schema con yup
  const validationSchema = Yup.object({
    configuration: Yup.array()
      .of(
        Yup.object({
          balanceId: Yup.number().required("El ID del balance es obligatorio"),
          diasTomandos: Yup.number()
            .min(0, "Los días tomados no pueden ser negativos")
            .required("Los días tomados son obligatorios"),
          notas: Yup.string().max(
            255,
            "Las notas no pueden exceder 255 caracteres"
          ),
        })
      )
      .min(1, "Debe configurar al menos un balance"),
  });

  // manejo del submit con formik

  const formik = useFormik({
    initialValues: {
      configuration:
        balances.map((b) => ({
          balanceId: b.balanceId,
          diasTomados: 0,
          notas: "",
        })) || [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values.configuration);
    },
  });

  const getFieldError = (index: number, field: "diasTomados" | "notas") => {
    const error = formik.errors.configuration?.[index];
    const touched = formik.touched.configuration?.[index];

    if (error && touched && typeof error === "object") {
      return (error as any)[field];
    }
    return undefined;
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline">
        Configurar
      </Button>
      <FormModal
        title="Configurar Balances de Vacaciones"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={formik.handleSubmit}
        size="lg"
        isValid={formik.isValid}
      >
        <FieldArray name="configuration">
          {() => (
            <>
              {formik.values.configuration.map((c, index) => (
                <div key={index}>
                  <Input
                    label={`Balance ID: ${c.balanceId}`}
                    name={`configuration[${index}].diasTomados`}
                    value={c.diasTomados}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={getFieldError(index, "diasTomados")}
                  />
                  <Input
                    label="Notas"
                    name={`configuration[${index}].notas`}
                    value={c.notas}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={getFieldError(index, "notas")}
                  />
                  <Input
                    label={`Días Tomados para Balance ID: ${c.balanceId}`}
                    name={`configuration[${index}].diasTomados`}
                    value={c.diasTomados}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={getFieldError(index, "diasTomados")}
                  />
                </div>
              ))}
            </>
          )}
        </FieldArray>
      </FormModal>
    </>
  );
};

export default ModalConfigBalance;
