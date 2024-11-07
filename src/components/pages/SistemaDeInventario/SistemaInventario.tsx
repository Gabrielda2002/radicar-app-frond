import React, { useState } from 'react';
import { useFetchDepartment } from '../../../hooks/useFetchUsers'
import DepartamentosList from './DepartamentosList';
import useFetchSedes from '../../../hooks/useFetchSedes';
import SedesList from './sedesList';

const SistemaInventario: React.FC = () => {

    const { department: departments, loading: loadingDepartment, errordepartment } = useFetchDepartment();
    const [ departmentSelect, setDepartmentSelect ] = useState<number | null>(null);
    const { sedes } = useFetchSedes(departmentSelect);
    const [ sedeSelect, setSedeSelect ] = useState<number | null>(null);
  

    
  return (
    <div>
        
        {loadingDepartment ? (
        <p>Cargando departamentos...</p>
      ) : errordepartment ? (
        <p>{errordepartment}</p>
      ) : (
        <DepartamentosList
          departamentos={departments}
          onSelected={(departamento) => {
            setDepartmentSelect(departamento.id)
            setSedeSelect(null)
          } 
          }
        />
      )}

      {departmentSelect && (
        <SedesList
          sedes={sedes}
          onSelect={(sede) => {
            setSedeSelect(sede.id)}
          }
            
        />
      )}
        
    </div>
  )
}

export default SistemaInventario
