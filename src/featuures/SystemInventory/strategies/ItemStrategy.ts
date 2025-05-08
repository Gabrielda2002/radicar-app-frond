import { ReactNode } from "react";
import { IItems } from "@/models/IItems";
import { IItemsNetworking } from "@/models/IItemsNetworking";
import { IItemsGeneral } from "../Models/IItemsGeneral";
import { IItemsTv } from "../Models/IItemsTv";
import { EquiposStrategy } from "./EquiposStrategy";
import { DispositivosRedStrategy } from "./DispositivosRedStrategy";
import { GeneralInventoryStrategy } from "./GeneralInventoryStrategy";

// Interfaz genérica para la estrategia de elementos de inventario
export interface ItemStrategy<T> {
  getName(item: T): string;
  getTypeLabel(item: T): string | null;
  getIcon(): ReactNode;
  renderDetailsButton(item: T, handleViewDetails: (item: T) => void): ReactNode;
  renderActionButtons(item: T, refreshItems: () => void, handleOpen?: (nombreSoporte: string | null, ruta: string) => void): ReactNode;
}

// Tipo unión que representa cualquier tipo de elemento de inventario
export type AnyItem = IItems | IItemsNetworking | IItemsGeneral | IItemsTv;

// Factory para obtener la estrategia correcta según el tipo de item
export const ItemStrategyFactory = {
  getStrategy(tipoItem: string): ItemStrategy<any> {
    switch (tipoItem) {
      case "equipos":
        return new EquiposStrategy();
      case "dispositivos-red":
        return new DispositivosRedStrategy();
      case "inventario/general":
        return new GeneralInventoryStrategy();
      // case "inventario/televisores":
      //   return new TelevisoresStrategy();
      default:
        throw new Error(`No hay estrategia definida para ${tipoItem}`);
    }
  },
};

// Luego implementaremos las clases de estrategia específicas en sus propios archivos.