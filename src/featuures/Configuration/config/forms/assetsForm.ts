import { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";
import * as Yup from 'yup'
import { fetchClassificationAsOptions } from "./optionsLoaders";

export const AssetsForm: TableFormConfig = {
    endPoint: 'activos',
    updateEndPoint: 'activos',
    create: {
        fields: [
            { name: 'name', label: 'Nombre', type: 'text', required: true },
            { name: 'classificationId', type: "select", label: "clasificación", required: true, options: fetchClassificationAsOptions }
        ],
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            classificationId: Yup.number().required('La clasificación es obligatoria')
        }),
        mapInitialValues: () => ({ name: '', classificationId: "" }),
    },
    edit: {
        fields: [
            { name: 'id', label: 'ID', type: 'number', readOnly: true },
            { name: 'name', label: 'Nombre', type: 'text', required: true },
            { name: 'classificationId', label: 'Clasificacion', type: "select", options: fetchClassificationAsOptions}

        ],
        validationSchema: Yup.object({
            id: Yup.number(),
            name: Yup.string().required('El nombre es obligatorio'),
            classificationId: Yup.number().required('La clasificación es obligatoria')
        }),
        mapInitialValues: (s) => ({
            id: s?.id,
            name: s?.name,
            classificationId: s?.classificationId
        })
    }
}