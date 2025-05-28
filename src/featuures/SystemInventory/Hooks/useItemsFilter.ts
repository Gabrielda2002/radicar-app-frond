import { useMemo } from 'react';
import useSearch from '@/hooks/useSearch';
import { IItems } from '@/models/IItems';
import { IItemsNetworking } from '@/models/IItemsNetworking';
import { IItemsGeneral } from '../Models/IItemsGeneral';
import { AnyItem } from '../strategies/ItemStrategy';

interface UseItemsFilterProps {
  data: AnyItem[] | null;
  tipoItem: string | null;
  selectedAreaDependency: string[];
}

interface UseItemsFilterReturn {
  query: string;
  setQuery: (query: string) => void;
  filteredData: AnyItem[];
}

export const useItemsFilter = ({
  data,
  tipoItem,
  selectedAreaDependency,
}: UseItemsFilterProps): UseItemsFilterReturn => {
  const searchFields = useMemo(() => {
    switch (tipoItem) {
      case "equipos":
        return ["nameEquipment", "brandEquipment", "modelEquipment", "nameUser", "lastNameUser"];
      case "dispositivos-red":
        return ["name", "brand", "model"];
      default:
        return ["name", "brand", "model", "responsable"];
    }
  }, [tipoItem]);

  const {
    query,
    setQuery,
    filteredData: searchFilteredData,
  } = useSearch<AnyItem>(data || [], searchFields as any);

  const finalFilterredData = useMemo(() => {
    if (
      tipoItem !== "inventario/general" ||
      selectedAreaDependency.length === 0
    ) {
      return searchFilteredData;
    }

    return searchFilteredData.filter((item) => {
      const generalItem = item as IItemsGeneral;
      return selectedAreaDependency.includes(generalItem.dependencyArea);
    });
  }, [searchFilteredData, tipoItem, selectedAreaDependency]);

  return {
    query,
    setQuery,
    filteredData: finalFilterredData,
  };
};
