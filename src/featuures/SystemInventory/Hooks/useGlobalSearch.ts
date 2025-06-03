import { useCallback, useMemo, useState } from "react";
import { AnyItem, ItemStrategyFactory } from "../strategies/ItemStrategy";
import { api } from "@/utils/api-config";

export interface GlobalSearchResult {
    item: AnyItem;
    tipoItem: string;
    departmentId: number;
    departmentName: string;
    sedeId: number;
    sedeName: string;
    strategy: any;
}

interface UseGlobalSearchReturn {
    searchResults: GlobalSearchResult[];
    isSearching: boolean;
    searchError: string | null;
    performGlobalSearch: (query: string) => Promise<void>;
    clearResults: () => void;
}

export const useGlobalSearch = (): UseGlobalSearchReturn => {
    const [searchResults, setSearchResults] = useState<GlobalSearchResult[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const itemTypes = useMemo(() => [
        'equipos',
        'dispositivos-red',
        'inventario/general',
        'inventario/televisores',
        'inventario/celulares'
    ], []);

    const performGlobalSearch = useCallback(async (query: string) => {
        if (!query.trim() || query.length < 2) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        setSearchError(null); 

        try {
            const searchPromises = itemTypes.map(async (tipoItem) => {
                try {
                    
                    const response = await api.get(`/search/${tipoItem}`, {
                        params: { query: query.trim() }
                    });

                    return response.data.map((result: any) => {
                        const strategy = ItemStrategyFactory.getStrategy(tipoItem);
                        return {
                            item: result.item,
                            tipoItem: tipoItem,
                            departmentId: result.departmentId,
                            departmentName: result.departmentName,
                            sedeId: result.sedeId,
                            sedeName: result.sedeName,
                            strategy: strategy
                        };
                    });

                } catch (error) {
                    console.warn(`Error searching in ${tipoItem}:`, error);
                    return [];
                }
            });

            const results = await Promise.all(searchPromises);
            const flatResults = results.flat();

            const sortedResults = flatResults.sort((a, b) => {
                const aName = a.strategy.getName(a.item).toLowerCase();
                const bName = b.strategy.getName(b.item).toLowerCase();

                const queryLower = query.toLowerCase();

                if(aName.includes(queryLower) && !bName.includes(queryLower)) return -1;
                if(!aName.includes(queryLower) && bName.includes(queryLower)) return 1;

                return aName.localeCompare(bName);
            })

            setSearchResults(sortedResults);

        } catch (error) {
            setSearchError(`Error al realizar la busqueda`)
            console.error("Error performing global search:", error);
        }finally{
            setIsSearching(false);
        }
    }, [itemTypes]);

    const clearResults = useCallback(() => {
        setSearchResults([]);
        setSearchError(null);
    }, []);

    return {
        searchResults,
        isSearching,
        searchError,
        performGlobalSearch,
        clearResults
    };

}