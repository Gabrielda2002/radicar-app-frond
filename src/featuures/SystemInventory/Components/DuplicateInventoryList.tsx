import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/utils/api-config";
import {
  AlertTriangle,
  Tag,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Pencil,
} from "lucide-react";
import {
  IDuplicateInventoryGroup,
  IDuplicateItemDetail,
} from "../Hooks/useFetchItemsInvNum";
import { GlobalSearchResult } from "../Hooks/useGlobalSearch";
import { AnyItem, IItemType, ItemStrategyFactory } from "../strategies/ItemStrategy";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

interface DuplicateInventoryListProps {
  groups: IDuplicateInventoryGroup[];
  loading: boolean;
  error: string | null;
  onNavigateToItem: (result: GlobalSearchResult) => void;
}

const SOURCE_TABLE_TO_TYPE: Record<string, IItemType> = {
  equipos: "equipments",
  celulares: "phones/inventory",
  dispositivos_red: "devices-red",
  televisores: "tv/inventory",
  inventario_general: "general/inventory",
  accesorios_equipos: "equipments",
};

const DuplicateInventoryList: React.FC<DuplicateInventoryListProps> = ({
  groups,
  loading,
  error,
  onNavigateToItem,
}) => {
  const [resolvingItemId, setResolvingItemId] = useState<number | null>(null);

  const handleItemClick = async (item: IDuplicateItemDetail) => {
    const tipoItem = SOURCE_TABLE_TO_TYPE[item.source_table];

    if (!tipoItem) {
      toast.error(
        `Categoría "${item.source_table}" no compatible con navegación directa.`
      );
      return;
    }

    setResolvingItemId(item.id);

    try {
      // 1. Intentar buscar por número de inventario en su tipo correspondiente
      const response = await api.get<
        {
          item: AnyItem;
          departmentId: number;
          departmentName?: string;
          sedeId: number;
          sedeName?: string;
        }[]
      >(`/${tipoItem}/search`, {
        params: { query: item.inventory_number.trim() },
      });

      let results = response.data || [];
      let match = results.find((r) => String(r.item?.id) === String(item.id));

      // 2. Si no se encontró por número de inventario, probar por nombre
      if (!match && item.name?.trim()) {
        const fallbackRes = await api.get<
          {
            item: AnyItem;
            departmentId: number;
            departmentName?: string;
            sedeId: number;
            sedeName?: string;
          }[]
        >(`/${tipoItem}/search`, {
          params: { query: item.name.trim() },
        });
        results = fallbackRes.data || [];
        match = results.find((r) => String(r.item?.id) === String(item.id));
      }

      // Si sólo vino un resultado o el match es válido
      const target = match || (results.length === 1 ? results[0] : null);

      if (!target || !target.sedeId || !target.departmentId) {
        toast.error(
          `No se pudo determinar la sede o departamento del item #${item.id}.`
        );
        return;
      }

      const strategy = ItemStrategyFactory.getStrategy(tipoItem);

      onNavigateToItem({
        item: target.item,
        tipoItem,
        departmentId: target.departmentId,
        departmentName: target.departmentName || "Departamento",
        sedeId: target.sedeId,
        sedeName: target.sedeName || "Sede",
        strategy,
      });
    } catch (err: unknown) {
      console.error("Error al localizar el item duplicado:", err);
      const errorMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Error al navegar al item. Por favor reintente.";
      toast.error(errorMessage);
    } finally {
      setResolvingItemId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 mt-8">
        <LoadingSpinner />
        <span className="mt-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
          Verificando números de inventario duplicados...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mt-8 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl">
        <p className="text-sm font-medium text-red-700 dark:text-red-300">
          {error}
        </p>
      </div>
    );
  }

  if (!groups || groups.length === 0) {
    return (
      <div className="flex items-center gap-3 p-4 mt-8 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div>
          <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
            Inventario Consistente
          </h4>
          <p className="text-xs text-emerald-700 dark:text-emerald-400">
            No se detectaron números de inventario duplicados en el sistema.
          </p>
        </div>
      </div>
    );
  }

  const totalConflicts = groups.reduce(
    (acc, group) => acc + (group.occurrences || group.items.length),
    0
  );

  return (
    <section className="mt-10 mb-6">
      {/* Header Informativo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 rounded-lg shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Números de Inventario Duplicados
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60">
                {groups.length} {groups.length === 1 ? "número repetido" : "números repetidos"} ({totalConflicts} items)
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Haz clic en cualquier item para ir directamente a su ubicación y modificar su número de inventario.
            </p>
          </div>
        </div>
      </div>

      {/* Grid de Grupos Duplicados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 items-start">
        {groups.map((group, groupIdx) => (
          <div
            key={`${group.inventoryNumber}-${groupIdx}`}
            className="flex flex-col p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header del grupo */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  N° Inventario:
                </span>
                <span className="font-mono text-sm font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/50">
                  {group.inventoryNumber}
                </span>
              </div>
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/40">
                {group.occurrences} en conflicto
              </span>
            </div>

            {/* Listado de items en conflicto */}
            <div className="space-y-2">
              {group.items.map((item, itemIdx) => {
                const tipoItem = SOURCE_TABLE_TO_TYPE[item.source_table];
                const typeMeta = tipoItem
                  ? ItemStrategyFactory.getMetadata(tipoItem)
                  : {
                      label: item.source_table,
                      badgeClass:
                        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200",
                      iconContainerClass:
                        "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border border-gray-200",
                    };

                const isResolving = resolvingItemId === item.id;

                let icon: React.ReactNode = null;
                if (tipoItem) {
                  try {
                    const strategy = ItemStrategyFactory.getStrategy(tipoItem);
                    icon = strategy.getIcon();
                  } catch {
                    icon = null;
                  }
                }

                return (
                  <button
                    key={`${item.source_table}-${item.id}-${itemIdx}`}
                    type="button"
                    disabled={isResolving}
                    onClick={() => handleItemClick(item)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700/80 bg-gray-50/60 dark:bg-gray-900/40 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-150 flex items-center justify-between gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    title={`Ir a editar item ${item.name} (#${item.id})`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-lg border shrink-0 ${typeMeta.iconContainerClass}`}
                      >
                        {icon || <Tag className="w-4 h-4" />}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {item.name || "Item sin descripción"}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <span
                            className={`text-[11px] font-medium px-2 py-0.2 rounded-full border ${typeMeta.badgeClass}`}
                          >
                            {typeMeta.label}
                          </span>
                          <span className="text-[11px] font-mono text-gray-400 dark:text-gray-400">
                            ID: #{item.id}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      {isResolving ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 animate-pulse">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Localizando...
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Ir a editar</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DuplicateInventoryList;
