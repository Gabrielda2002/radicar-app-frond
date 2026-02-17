import Button from '@/components/common/Ui/Button'
import FormModal from '@/components/common/Ui/FormModal'
import { CheckCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import useStoreMonitoringItem from '../../Store/useStoreMonitoringItem'

type ModalCheckListProps = {
    monitoringId: string;
}

const ModalCheckList: React.FC<ModalCheckListProps> = ({ monitoringId }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { getChecklistsByMonitoringId, checklistData, isLoading, error } = useStoreMonitoringItem();

    useEffect(() => {
        if (monitoringId) {
            getChecklistsByMonitoringId(monitoringId);
        }
    }, [monitoringId])

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
                    onSubmit={() => console.log('submit')}
                >
                    {checklistData.length === 0 ? (
                        <div>
                            {isLoading ? 'Cargando checklist...' : 'No hay checklist disponible para este seguimiento.'}
                        </div>
                    ) : (
                        checklistData.map(i => (
                            <div key={i.id} className='flex items-center gap-2 p-2 border-b last:border-b-0'>
                                <p>{i.checklistItemRelation.label}</p>
                                <p>{i.checklistItemRelation.id}</p>
                                <p>{i.checklistItemRelation.itemKey}</p>
                            </div>
                        ))
                    )}

                </FormModal>, document.body
            )}
        </>
    )
}

export default ModalCheckList
