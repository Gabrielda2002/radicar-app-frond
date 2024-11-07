import React from 'react'
import { ILugarRadicacion } from '../../../models/ILugarRadicado'

interface sedesListProps {
    sedes: ILugarRadicacion[] | null;
    onSelect: (sede: ILugarRadicacion) => void;
}

const SedesList: React.FC<sedesListProps> = ({
    sedes,
    onSelect
}) => {

    console.log(sedes)
  return (
    <div>
        <h2>
            Sedes
        </h2>
        {sedes?.map((s) => (
            <button
                key={s.id}
                onClick={() => onSelect(s)}
            >
                {s.name}
            </button>
        ))}
    </div>

  )
}
export default SedesList;
