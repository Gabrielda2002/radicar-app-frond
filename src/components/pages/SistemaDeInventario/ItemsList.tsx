import React from 'react'
import { IItems } from '../../../models/IItems'
import { IItemsNetworking } from '../../../models/IItemsNetworking';
import ModalItemsDetails from '../modals/ModalItemsDetails';

interface ItemsListProps {
    invetario: IItems[] | IItemsNetworking[]  | null;
    tipoItem: 'equipos' | 'dispositivos-red' | null;
    idSede: number | null;
}

const ItemsList: React.FC<ItemsListProps> = ({
    invetario,
    tipoItem
}) => {

  const [ selected, setSelected ] = React.useState<IItems | IItemsNetworking | null>(null);

  const handleViewDetails = (item: IItems | IItemsNetworking) => {
    setSelected(item);
  }

  const closeModal = () => {
    setSelected(null);
  }

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
                    <button 
                      onClick={() => handleViewDetails(item)}
                      className="btn btn-primary"
                    >
                      ver mas detalles
                    </button>
                    </>
                ) : (
                    <>
                    <p>{(item as IItemsNetworking).name}</p>
                    <button 
                      onClick={() => handleViewDetails(item)}
                      className="btn btn-primary"
                    >
                      ver mas detalles
                    </button>
                    </>
                )}
            </li>
        ))}
      </ul>
      {selected && (
        <ModalItemsDetails  item={selected} onClose={closeModal} />
      )}
    </>
  )
}

export default ItemsList
