import * as Yup from "yup";

export const eventValidationSchema = Yup.object({
  title: Yup.string()
    .required("El título es requerido")
    .min(2, "El título debe tener al menos 2 caracteres")
    .max(200, "El título debe tener máximo 200 caracteres"),
  description: Yup.string()
    .required("La descripción es requerida")
    .min(2, "La descripción debe tener al menos 2 caracteres")
    .max(300, "La descripción debe tener máximo 300 caracteres"),
  place: Yup.string()
    .required("El lugar es requerido")
    .max(150, "El lugar debe tener máximo 150 caracteres"),
//   responsableNombre: Yup.string()
//     .required("El nombre del responsable es requerido")
//     .max(120, "El nombre debe tener máximo 120 caracteres"),
//   responsableCorreo: Yup.string()
//     .required("El correo del responsable es requerido")
//     .email("El correo no es válido"),
  dateStart: Yup.string().required("La fecha de inicio es requerida"),
  dateEnd: Yup.string()
    .required("La fecha de fin es requerida")
    .test("fecha-posterior", "La fecha de fin no puede ser anterior", function (value) {
      return !value || !this.parent.fechaInicio || value >= this.parent.fechaInicio;
    }),
  timeStart: Yup.string().required("La hora de inicio es requerida"),
  timeEnd: Yup.string()
    .required("La hora de fin es requerida")
    .test(
      "hora-posterior",
      "La hora de fin debe ser posterior a la hora de inicio",
      function (value) {
        if (!value || !this.parent.horaInicio || this.parent.fechaFin !== this.parent.fechaInicio)
          return true;
        return value >= this.parent.horaInicio;
      },
    ),  
  color: Yup.string().required("El color es requerido"),
});
