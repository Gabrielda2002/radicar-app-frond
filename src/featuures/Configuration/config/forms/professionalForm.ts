import { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";
import * as Yup from "yup";


export const professionalForm: TableFormConfig = {
    endPoint: 'professional',
    updateEndPoint: 'professional',
    create: {
        fields: [
            { name: "name", label: "Nombre del Profesional", type: "text", required: true },
        ],
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
        }),
        mapInitialValues: () => ({ name: "" }),
    },
    edit: {
        fields: [
            { name: "id", label: "ID Profesional", type: "text", readOnly: true },
            { name: "name", label: "Nombre del Profesional", type: "text", required: true },
        ],
        validationSchema: Yup.object({
            id: Yup.number(),
            name: Yup.string().required("El nombre es obligatorio"),
        }),
        mapInitialValues: (source) => ({
            id: source?.id ?? "",
            name: source?.name ?? "",
        })
    }
}