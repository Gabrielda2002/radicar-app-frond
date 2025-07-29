import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import Button from "@/components/common/Ui/Button";
import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import { useTheme } from "@/context/blackWhiteContext";
import { useFormik } from "formik";
import { useState } from "react";
import { createPortal } from "react-dom";
import * as Yup from "yup";
import { useProgramsGoals } from "../Hooks/useProgramsGoals";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import Select from "@/components/common/Ui/Select";

interface ModalCreateGoalProgramProps {
  onGoalCreated?: () => void; // Callback para notificar al padre
}

const ModalCreateGoalProgram: React.FC<ModalCreateGoalProgramProps> = ({
  onGoalCreated,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { theme } = useTheme();

  const { handleCreateGoal, error, loading } = useProgramsGoals();

  const validationSchema = Yup.object({
    goal: Yup.number().required("La meta es requerida"),
    program: Yup.string().required("El programa es requerido"),
    professional: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      goal: "",
      program: "",
      professional: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);

      const response = await handleCreateGoal(values);

      if (response?.status === 200 || response?.status === 201) {
        formik.resetForm();
        toast.success("Meta del programa creada correctamente");
        setIsOpen(false); // Cerrar el modal
        onGoalCreated?.(); // Notificar al componente padre
      }
    },
  });

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="secondary">
        Crear Meta del Programa
      </Button>
      {isOpen &&
        createPortal(
          <div className={`${theme === "dark" ? "dark" : ""}`}>
            <FormModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Crear Meta del Programa"
              size="md"
              onSubmit={formik.handleSubmit}
              submitText="Crear"
              isSubmitting={formik.isSubmitting || loading}
              isValid={formik.isValid}
            >
              <div className="grid grid-cols-2  p-3 gap-2 min-h-52">
                <Input
                  label="Meta"
                  name="goal"
                  type="number"
                  value={formik.values.goal}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.goal && formik.errors.goal
                      ? formik.errors.goal
                      : ""
                  }
                  required
                />
                <InputAutocompletado
                  apiRoute="programas/buscar"
                  onInputChanged={(value) =>
                    formik.setFieldValue("program", value)
                  }
                  label="Programa"
                  touched={formik.touched.program}
                  error={formik.errors.program}
                  placeholder="Ej: Vacunación menores de 6"
                  required={true}
                />
                <Select
                  options={[
                    { value: "Medicina General", label: "Medicina General" },
                    { value: "Enfermería", label: "Enfermería" },
                  ]}
                  label="Profesional"
                  id="professional"
                  value={formik.values.professional}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="professional"
                  touched={formik.touched.professional}
                  error={formik.errors.professional}
                  required={true}
                />
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
          </div>,
          document.body
        )}
    </>
  );
};

export default ModalCreateGoalProgram;
