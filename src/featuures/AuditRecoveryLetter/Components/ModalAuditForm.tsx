import { CupsAuthorizedLetter } from "@/models/IAuditLetter";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { CreateAuditLetter } from "../Services/CreateAuditLetter";
import { format } from "date-fns";
import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";

interface ModalAuditFormProps {
  isOpen: boolean;
  onClose: () => void;
  cupsAuthorized: CupsAuthorizedLetter[];
  idRadicado: number;
  idRequest: number;
}
interface FormValues {
  observation: string;
  cups: {
    id: number;
    code: number;
    DescriptionCode: string;
    statusLetter: string;
  }[];
  idUserAudit: number;
  idRadicado: number;
}
interface ErrorsForm {
  observation?: string;
  statusLetter?: string;
}
const ModalAuditForm: FC<ModalAuditFormProps> = ({
  isOpen,
  onClose,
  cupsAuthorized,
  idRadicado,
  idRequest,
}) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const user = localStorage.getItem("user");
  const idUsuario = user ? JSON.parse(user).id : "";

  const dateNow = format(new Date(), "yyyy-MM-dd");

  const validationSchema = Yup.object({
    observation: Yup.string().required("Campo requerido"),
    cups: Yup.array().of(
      Yup.object().shape({
        statusLetter: Yup.string().required("Campo requerido"),
      })
    ),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      observation: "",
      cups: [],
      idUserAudit: idUsuario,
      idRadicado: idRadicado,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const response = await CreateAuditLetter(values, idRequest);

        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true);
          setLoading(false);
          formik.resetForm();
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 2000);
        } else {
          setError("Error al enviar la solicitud");
          setLoading(false);
        }
      } catch (error) {
        setError("Error inesperado al cargar la auditoria. " + error);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (cupsAuthorized.length > 0) {
      formik.setValues({
        observation: "",
        cups: cupsAuthorized.map((cup) => ({
          id: cup.id,
          code: cup.code,
          DescriptionCode: cup.DescriptionCode,
          statusLetter: "",
          dateAuditRecoveryLatter: dateNow,
        })),
        idUserAudit: idUsuario,
        idRadicado: idRadicado,
      });
    }
  }, [cupsAuthorized]);

  return (
    <>
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        title="Enviar solicitud"
        isSubmitting={loading}
        isValid={formik.isValid}
        submitText="Enviar"
        onSubmit={formik.handleSubmit}
        size="md"
      >
        <div className="px-5 max-h-[70vh] overflow-y-auto">
          <h5 className="p-2 mt-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
              Datos de la auditoria
            </h5>
          <section className="grid grid-cols-1 mb-6 text-sm gap-x-10 gap-y-2 ms-2">
            <div>
              <Input
                label="Observacion"
                id="observation"
                name="observation"
                onChange={formik.handleChange}
                value={formik.values.observation}
                onBlur={formik.handleBlur}
                placeholder="Observacion"
                error={
                  formik.touched.observation && formik.errors.observation
                    ? formik.errors.observation
                    : undefined
                }
                touched={formik.touched.observation}
                required
              />
            </div>

              <h5 className="p-2 mt-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                Datos de la solicitud
              </h5>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">

              {cupsAuthorized &&
                formik.values.cups.map((cup, index) => (
                  <div
                    key={cup.id}
                    className="w-full p-4 mx-1 bg-gray-100 border rounded-md shadow-md dark:bg-gray-700"
                  >
                    <div className="mb-4">
                      <Input
                        label="Codigo CUPS"
                        id={`cups[${index}].code`}
                        type="text"
                        value={cup.code}
                        readOnly
                      />
                    </div>
                    <div className="mb-4">
                      <Input
                        label="Descripcion CUPS"
                        type="text"
                        value={cup.DescriptionCode}
                        readOnly
                      />
                    </div>
                    <div className="mb-4">
                      <Select
                        options={[
                          { label: "Autorizado", value: "Autorizado" },
                          {
                            label: "No Autorizado",
                            value: "No Autorizado",
                          },
                        ]}
                        label="Estado de la carta"
                        name={`cups[${index}].statusLetter`}
                        value={formik.values.cups[index].statusLetter}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.cups?.[index]?.statusLetter}
                        error={
                          formik.touched.cups?.[index]?.statusLetter &&
                          formik.errors.cups &&
                          typeof formik.errors.cups !== "string" &&
                          (formik.errors.cups as Array<ErrorsForm>)[index]
                            ?.statusLetter
                            ? (formik.errors.cups as Array<ErrorsForm>)[index]
                                ?.statusLetter
                            : undefined
                        }
                        required
                      />
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>
        {success && <div className="text-green-500">Solicitud enviada</div>}

        {error && <div className="text-red-500">{error}</div>}
      </FormModal>
    </>
  );
};

export default ModalAuditForm;
