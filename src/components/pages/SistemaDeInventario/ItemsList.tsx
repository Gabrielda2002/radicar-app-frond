import React from 'react'
import { IItems } from '../../../models/IItems'

interface ItemsListProps {
    invetario: IItems[] | null;
    sede: string | null;
}

const ItemsList: React.FC<ItemsListProps> = ({
    invetario,
    sede
}) => {
  return (
    <>
      <h2>
        Inventario de {sede}
      </h2>
      <ul>
        {invetario?.map((item) => (
          <li key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default ItemsList
