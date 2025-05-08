import { EquiposStrategy } from '../strategies/EquiposStrategy';
import { DispositivosRedStrategy } from './DispositivosRedStrategy';
// import { InventarioGeneralStrategy } from '../strategies/InventarioGeneralStrategy';
// import { TelevisoresStrategy } from '../strategies/TelevisoresStrategy';

// Para registrar un nuevo tipo de inventario, solo añade una nueva entrada aquí
export const INVENTORY_TYPES = {
  'equipos': {
    label: 'Equipos',
    strategy: EquiposStrategy
  },
  'dispositivos-red': {
    label: 'Dispositivos de Red',
    strategy: DispositivosRedStrategy
  },
  // 'inventario/general': {
  //   label: 'Inventario General',
  //   strategy: InventarioGeneralStrategy
  // },
  // 'inventario/televisores': {
  //   label: 'Televisores',
  //   strategy: TelevisoresStrategy
  // },
  // Añade nuevos tipos aquí
};

// Exporta los tipos como string literals para TypeScript
export type InventoryType = keyof typeof INVENTORY_TYPES;