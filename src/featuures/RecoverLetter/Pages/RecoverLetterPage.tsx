import ModalSection from '@/components/common/HeaderPage/HeaderPage'
import React from 'react'

const RecoverLetterPage = () => {
  return (
    <>
        <ModalSection
            title="Solicitar Carta de Recobro"
            breadcrumb={[
                {label: "Inicio", path: "/home"}
            ]}
        />

        <div className='w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40'>
        <section>
            {/*barra de busqueda*/}
        </section>

            <div className='overflow-x-auto'>
              <table className='min-w-full overflow-hidden text-sm rounded-lg shadow-lg'>
                <thead className='bg-gray-200 dark:bg-gray-700'> 

                <tr className='shadow-md dark:text-gray-300 rounded-t-md'>
                  <th>Fecha-hora Radicado</th>
                  <th>Tipo Documento Paciente</th>
                  <th>N. Documento Paciente</th>
                  <th>Nombre Paciente</th>
                  <th>Convenio</th>
                  <th>Profesional</th>
                  <th>CUPS</th>
                </tr>
                  
                </thead>

              <tbody className='text-xs text-center dark:text-gray-200'>
                
              </tbody>

              </table>
            </div>

        </div>

    </>
  )
}

export default RecoverLetterPage
