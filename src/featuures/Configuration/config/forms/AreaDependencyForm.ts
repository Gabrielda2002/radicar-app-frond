import { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";
import * as Yup from 'yup'

export const AreaDependencyForm: TableFormConfig = {
    endPoint: 'area-dependencia',
    updateEndPoint: 'area-dependencia',
    create: {
        fields: [
            { name: 'name', label: 'Nombre', type: 'text', required: true }
        ],
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre es obligatorio")
        }),
        mapInitialValues: () => ({ name: ''}),
    },
    edit: {
        fields: [
            { name: 'id', label: 'ID', type: 'number', readOnly: true},
            { name: 'name', label: 'Nombre', type: 'text', required: true }
        ],
        validationSchema: Yup.object({
            id: Yup.number(),
            name: Yup.string().required('El nombre es obligatorio')
        }),
        mapInitialValues: (s) => ({
            id: s?.id,
            name: s?.name
        })
    }
}