import ModalSection from '@/components/common/HeaderPage/HeaderPage'

const DemandInduce = () => {
  return (
    <>
    <ModalSection
        title='Inducción de demanda'
        breadcrumb={[
            { label: 'Inicio', path: '/' },
            { label: 'Inducción de demanda', path: '/demanda/inducida' }
        ]}
    />
    <div className='w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/10'>
    {/* Barra de busqueda y demas parametros */}
        <div className='mt-4 mb-5 overflow-y-auto'>
            <table className='min-w-full overflow-hidden text-sm text-center rounded-lg shadow-lg'>
                <thead>
                    <tr className=' text-sm text-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'>
                        <th>Documento</th>
                        <th>Fecha Creacion</th>
                        <th>TipoDemanda inducida</th>
                        <th>Resumen Demanda Inducida</th>
                        <th>Paciente</th>
                    </tr>
                </thead>

            </table>
        </div>
    </div>
      
    </>
  )
}

export default DemandInduce
