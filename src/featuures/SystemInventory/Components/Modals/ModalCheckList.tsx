import Button from '@/components/common/Ui/Button'
import FormModal from '@/components/common/Ui/FormModal'
import { CheckCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import useStoreMonitoringItem from '../../Store/useStoreMonitoringItem'
import * as Yup from "yup";
import { useFormik } from 'formik'
import Input from '@/components/common/Ui/Input'
import { toast } from 'react-toastify'

type ModalCheckListProps = {
    monitoringId: string;
}

const ModalCheckList: React.FC<ModalCheckListProps> = ({ monitoringId }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { getChecklistsByMonitoringId, checklistData, isLoading, error, updateChecklistItem  } = useStoreMonitoringItem();

    useEffect( () => {
        if (monitoringId && isOpen) {
            getChecklistsByMonitoringId(monitoringId);
        }
    }, [monitoringId, isOpen])

    const validationSchema = Yup.object({
        items: Yup.array().of(
            Yup.object().shape({
                id: Yup.number().required(),
                monitoringId: Yup.number().required(),
                checklistItemId: Yup.number().required(),
                isChecked: Yup.boolean().required(),
            })
        )
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            items: checklistData.map(i => ({
                id: i.id,
                monitoringId: i.seguimientoEquipoId,
                checklistItemId: i.checklistItemId,
                isChecked: i.isChecked,
                label: i.checklistItemRelation.label,
            }))
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await updateChecklistItem(monitoringId, values, () => {
                toast.success("Checklist actualizado correctamente");
                setIsOpen(false);
            })
        }
    })

    return (
        <>
            <Button
                variant='any'
                onClick={() => setIsOpen(true)}
                icon={<CheckCheck className='w-4 h-4' />}
            />
            {isOpen && createPortal(
                <FormModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title='Checklist de mantenimiento'
                    size='lg'
                    onSubmit={formik.handleSubmit}
                    isSubmitting={formik.isSubmitting || isLoading}
                >
                    <div className='grid grid-cols-2 gap-2 p-4'>
                    {checklistData.length === 0 ? (
                        <div>
                            {isLoading ? 'Cargando checklist...' : 'No hay checklist disponible para este seguimiento.'}
                        </div>
                    ) : (
                        formik.values.items.map((i, idx) => (
                            <div className='flex items-center gap-2' key={i.id}>
                                <Input
                                    type='checkbox'
                                    name={`items[${idx}].isChecked`}
                                    label={i.label}
                                    checked={formik.values.items[idx].isChecked}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.items[idx].isChecked ? 'true' : 'false'}
                                />
                            </div>
                        ))
                    )}
                    {error && <div className='text-red-500'>{error}</div>}
                    </div>

                </FormModal>, document.body
            )}
        </>
    )
}

export default ModalCheckList
