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
import { AnimatePresence } from 'framer-motion'

type ModalCheckListProps = {
    monitoringId: string;
}

const ModalCheckList: React.FC<ModalCheckListProps> = ({ monitoringId }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { getChecklistsByMonitoringId, checklistData, isLoading, error, updateChecklistItem } = useStoreMonitoringItem();

    useEffect(() => {
        if (monitoringId && isOpen) {
            getChecklistsByMonitoringId(monitoringId);
        }
    }, [monitoringId, isOpen])

    const validationSchema = Yup.object({
        checklist: Yup.array().of(
            Yup.object().shape({
                id: Yup.number().required(),
                monitoringId: Yup.number().required(),
                checklistItemId: Yup.number().required(),
                isChecked: Yup.boolean().required(),
            })
        ),
        accessories: Yup.array().of(
            Yup.object().shape({
                id: Yup.number().required(),
                name: Yup.string().required(),
                status: Yup.string(),
                observation: Yup.string(),
            })
        )
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            checklist: checklistData?.checklist?.map((i: any) => ({
                id: i.id,
                monitoringId: i.seguimientoEquipoId,
                checklistItemId: i.checklistItemId,
                isChecked: i.isChecked,
                label: i.checklistItemRelation.label,
            })) || [],
            accessories: checklistData?.accessories?.map((a: any) => ({
                id: a.id,
                name: a.name,
                status: '',
                observation: '',
            })) || []
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
                    size='xl'
                    onSubmit={formik.handleSubmit}
                    isSubmitting={formik.isSubmitting || isLoading}
                >
                    <div className='flex flex-col gap-6 p-4'>
                        {/* Sección Checklist */}
                        <div>
                            <h3 className='text-lg font-semibold mb-4'>Checklist de Mantenimiento</h3>
                            {isLoading ? (
                                <div>Cargando checklist...</div>
                            ) : formik.values.checklist.length === 0 ? (
                                <div>No hay checklist disponible para este seguimiento.</div>
                            ) : (
                                <div>
                                    {/* Grid de 4 columnas para los items del checklist */}
                                    <div className='grid grid-cols-4 gap-x-4 gap-y-3'>
                                        {formik.values.checklist.map((item: any, idx: number) => (
                                            <div key={item.id} className='flex items-center gap-2'>
                                                <Input
                                                    id={`checklist-${idx}`}
                                                    type='checkbox'
                                                    name={`checklist[${idx}].isChecked`}
                                                    checked={formik.values.checklist[idx].isChecked}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <label htmlFor={`checklist-${idx}`} className='text-sm cursor-pointer'>
                                                    {item.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sección Accesorios */}
                        {formik.values.accessories.length > 0 && (
                            <div className='border-t pt-6'>
                                <h3 className='text-lg font-semibold mb-4'>Accesorios</h3>
                                <div className='space-y-3'>
                                    {/* Encabezados de accesorios: Nombre, Checkbox, Estado, Observación */}
                                    <div className='grid grid-cols-[2fr_1.5fr_2fr] gap-3 font-semibold text-sm border-b pb-2'>
                                        <div>Accesorio</div>
                                        <div>Estado</div>
                                        <div>Observación</div>
                                    </div>
                                    
                                    {/* Items de accesorios: cada fila tiene 4 columnas */}
                                    {formik.values.accessories.map((accessory: any, idx: number) => (
                                        <div key={accessory.id} className='grid grid-cols-[2fr_1.5fr_2fr] gap-3 items-start'>
                                            <div className='flex items-center'>
                                                <label className='text-sm'>{accessory.name}</label>
                                            </div>
                                            <div>
                                                <Input
                                                    type='text'
                                                    name={`accessories[${idx}].status`}
                                                    placeholder='Estado del accesorio'
                                                    value={formik.values.accessories[idx].status}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    name={`accessories[${idx}].observation`}
                                                    placeholder='Observaciones...'
                                                    value={formik.values.accessories[idx].observation}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Mensajes de error */}
                        <AnimatePresence>
                            {error && (
                                <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                                    {error}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                </FormModal>, document.body
            )}
        </>
    )
}

export default ModalCheckList
