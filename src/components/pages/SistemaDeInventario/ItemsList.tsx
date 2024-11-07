import React from 'react'
import { IItems } from '../../../models/IItems'
import { IItemsNetworking } from '../../../models/IItemsNetworking';

interface ItemsListProps {
    invetario: IItems[] | IItemsNetworking[]  | null;
    tipoItem: 'equipos' | 'dispositivos-red' | null;
}

const ItemsList: React.FC<ItemsListProps> = ({
    invetario,
    tipoItem
}) => {
  return (
    <>
      <h2>
        Inventario de {tipoItem}
      </h2>
      <ul>
        {invetario?.map((item) => (
            <li key={item.id}>
                {tipoItem === 'equipos' ? (
                    <>
                    <p>{(item as IItems).name}</p>
                    </>
                ) : (
                    <>
                    <p>{(item as IItemsNetworking).name}</p>
                    </>
                )}
            </li>
        ))}
      </ul>
    </>
  )
}

export default ItemsList
