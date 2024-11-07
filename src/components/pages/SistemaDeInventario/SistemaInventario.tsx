import React, { useState } from 'react';
import { useFetchDepartment, useFetchLugarRadicado } from '../../../hooks/useFetchUsers'

const SistemaInventario: React.FC = () => {

    const { department, loading, errordepartment } = useFetchDepartment();
    const [ departmentSelect, setDepartmentSelect ] = useState<number | null>(null);
    const { data, loading, error } = useFetchLugarRadicado();
    const [ lugarRadicadoSelect, setLugarRadicadoSelect ] = useState<number | null>(null);


  return (
    <div>
        
        
        
    </div>
  )
}

export default SistemaInventario
