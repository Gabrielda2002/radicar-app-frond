import React, { useState } from "react";
import { ModalConfigBalanceProps } from "../Types/IBalancesVacations";
import FormModal from "@/components/common/Ui/FormModal";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "@/components/common/Ui/Input";
import Button from "@/components/common/Ui/Button";
import { useBalancesMutations } from "../Hooks/useBalancesMutations";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";

const ModalConfigBalance: React.FC<ModalConfigBalanceProps> = ({
  balances,
  onSuccess,
  userId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { configureBalances, error, isLoading } = useBalancesMutations();

  const validationSchema = Yup.object({
    configuration: Yup.array()
      .of(
        Yup.object({
          balanceId: Yup.number().required("El ID del balance es obligatorio"),
          diasTomados: Yup.number()
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
      configureBalances(values, userId, () => {
        setIsOpen(false);
        onSuccess();
        formik.resetForm();
        toast.success("Balances configurados correctamente");
      });
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
        isSubmitting={formik.isSubmitting || isLoading}
        isValid={formik.isValid}
      >
        <div className="space-y-4 grid grid-cols-1">
          {formik.values.configuration.map((c, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 grid-cols-1 gap-4 py-3 px-4"
            >
              <Input
                type="number"
                label={`Días Tomados para Balance ID: ${c.balanceId}`}
                name={`configuration[${index}].diasTomados`}
                value={formik.values.configuration[index].diasTomados}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getFieldError(index, "diasTomados")}
                touched={formik.touched.configuration?.[index]?.diasTomados}
                required
              />
              <Input
                label="Notas (Opcional)"
                name={`configuration[${index}].notas`}
                value={formik.values.configuration[index].notas}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getFieldError(index, "notas")}
                touched={formik.touched.configuration?.[index]?.notas}
              />
            </div>
          ))}
          <AnimatePresence>
            {error && (
              <div>
                <div className="p-4 text-start text-white bg-red-500 rounded-lg shadow-lg">
                  {error}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </FormModal>
    </>
  );
};

export default ModalConfigBalance;
