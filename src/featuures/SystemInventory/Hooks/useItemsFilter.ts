import { useMemo } from 'react';
import useSearch, { NestedKeyOf } from '@/hooks/useSearch';
import { IItemsGeneral } from '../Models/IItemsGeneral';
import { AnyItem, IItemType, ItemStrategy } from '../strategies/ItemStrategy';

interface UseItemsFilterProps {
  data: AnyItem[] | null;
  strategy: ItemStrategy<AnyItem> | null;
  tipoItem: IItemType | null;
  selectedAreaDependency: string[];
}

interface UseItemsFilterReturn {
  query: string;
  setQuery: (query: string) => void;
  filteredData: AnyItem[];
}

export const useItemsFilter = ({
  data,
  strategy,
  tipoItem,
  selectedAreaDependency,
}: UseItemsFilterProps): UseItemsFilterReturn => {
  const searchFields = useMemo<NestedKeyOf<AnyItem>[]>(() => {
    if (!strategy) return [];
    return strategy.getSearchFields();
  }, [strategy]);

  const {
    query,
    setQuery,
    filteredData: searchFilteredData,
  } = useSearch<AnyItem>(data || [], searchFields);

  const finalFilterredData = useMemo(() => {
    if (
      tipoItem !== "general/inventory" ||
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
