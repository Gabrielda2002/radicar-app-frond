import { EquiposStrategy } from '../strategies/EquiposStrategy';
import { DispositivosRedStrategy } from './DispositivosRedStrategy';
import { GeneralInventoryStrategy } from './GeneralInventoryStrategy';
import { TelevisoresStrategy } from './TvStrategy';
import { PhoneStrategy } from './PhoneStrategy';
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
  'inventario/general': {
    label: 'Inventario General',
    strategy: GeneralInventoryStrategy
  },
  'inventario/televisores': {
    label: 'Televisores',
    strategy: TelevisoresStrategy
  },
  'inventario/celulares': {
    label: 'Celulares',
    strategy: PhoneStrategy
  }
  // Añade nuevos tipos aquí
};

// Exporta los tipos como string literals para TypeScript
export type InventoryType = keyof typeof INVENTORY_TYPES;