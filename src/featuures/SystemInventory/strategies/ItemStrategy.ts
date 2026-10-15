import { ReactNode } from "react";
import { NestedKeyOf } from "@/hooks/useSearch";
import { IItems } from "@/models/IItems";
import { IItemsNetworking } from "@/models/IItemsNetworking";
import { IItemsGeneral } from "../Models/IItemsGeneral";
import { IItemsTv } from "../Models/IItemsTv";
import { EquiposStrategy } from "./EquiposStrategy";
import { DispositivosRedStrategy } from "./DispositivosRedStrategy";
import { GeneralInventoryStrategy } from "./GeneralInventoryStrategy";
import { TelevisoresStrategy } from "./TvStrategy";
import { IItemsPhone } from "../Models/IItemsPhone";
import { PhoneStrategy } from "./PhoneStrategy";

export type IItemType =
    | "equipments"
    | "devices-red"
    | "general/inventory"
    | "tv/inventory"
    | "phones/inventory"

export interface ItemStrategy<T> {
  getName(item: T): string;
  getTypeLabel(item: T): string | null;
  getSearchFields(): NestedKeyOf<T>[];
  getIcon(): ReactNode;
  renderDetailsButton(item: T, tipoItem: IItemType, refreshItems?: () => void): ReactNode;
  renderActionButtons(
    item: T,
    refreshItems: () => void,
    handleOpen?: (fileId: string, action: "VIEW" | "DOWNLOAD", type?: "files" | "soporte") => Promise<void>
  ): ReactNode;
  renderBasicInfo(item: T): ReactNode;
  renderTechnicalDetails(item: T): ReactNode;
  renderAdditionalInfo(item: T): ReactNode;
  renderCreateButton(
    idSede: number,
    items: T | null,
    refreshItems: () => void,
    idItems: number | null,
    isUpdate?: boolean
  ): ReactNode;
}

// Tipo unión que representa cualquier tipo de elemento de inventario
export type AnyItem =
  | IItems
  | IItemsNetworking
  | IItemsGeneral
  | IItemsPhone
  | IItemsTv;

export interface ItemTypeMetadata {
  label: string;
  badgeClass: string;
  iconContainerClass: string;
}

export const ITEM_TYPE_METADATA: Record<IItemType, ItemTypeMetadata> = {
  equipments: {
    label: "Equipos",
    badgeClass:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60",
    iconContainerClass:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40",
  },
  "devices-red": {
    label: "Dispositivos de Red",
    badgeClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60",
    iconContainerClass:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40",
  },
  "general/inventory": {
    label: "Inventario General",
    badgeClass:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60",
    iconContainerClass:
      "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border border-purple-100 dark:border-purple-900/40",
  },
  "tv/inventory": {
    label: "Televisores",
    badgeClass:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60",
    iconContainerClass:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40",
  },
  "phones/inventory": {
    label: "Celulares",
    badgeClass:
      "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300 border border-pink-200 dark:border-pink-800/60",
    iconContainerClass:
      "bg-pink-50 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400 border border-pink-100 dark:border-pink-900/40",
  },
};

export const getItemTypeMetadata = (tipoItem: IItemType): ItemTypeMetadata => {
  return (
    ITEM_TYPE_METADATA[tipoItem] || {
      label: tipoItem,
      badgeClass:
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200",
      iconContainerClass:
        "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border border-gray-200",
    }
  );
};

// Factory para obtener la estrategia correcta según el tipo de item
export const ItemStrategyFactory = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getStrategy(tipoItem: IItemType): ItemStrategy<any> {
    switch (tipoItem) {
      case "equipments":
        return new EquiposStrategy();
      case "devices-red":
        return new DispositivosRedStrategy();
      case "general/inventory":
        return new GeneralInventoryStrategy();
      case "tv/inventory":
        return new TelevisoresStrategy();
      case "phones/inventory":
        return new PhoneStrategy();
      default:
        throw new Error(`No hay estrategia definida para ${tipoItem}`);
    }
  },
  getMetadata(tipoItem: IItemType): ItemTypeMetadata {
    return getItemTypeMetadata(tipoItem);
  },
};
