import React from 'react'
import { IDepartamentos } from '../../../models/IDepartamentos'

interface DepartamentosListProps {
    departamentos: IDepartamentos[] | null;
    onSelected: (departamentos: IDepartamentos) => void;
}

const DepartamentosList: React.FC<DepartamentosListProps> = ({
    departamentos,
    onSelected
}) => {
  return (
    <>
      <h2>
        Departamentos
      </h2>
      {departamentos?.map((d) => (
        <button
            key={d.id}
            onClick={() => onSelected(d)}
        >
            {d.name}
        </button>
      ))}
    </>
  )
}

export default DepartamentosList
