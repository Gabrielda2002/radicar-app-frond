/**
 * Sistema centralizado de tamaños de columnas para tablas
 * Permite mantener consistencia visual en toda la aplicación
 */

export type ColumnSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Mapeo de tamaños a pesos para cálculo automático de porcentajes
 * Cada peso se convierte a porcentaje basado en el total de pesos de la tabla
 * 
 * Guía aproximada (para tabla con ~10-12 columnas):
 * - xs (1):  ~4-5%
 * - sm (2):  ~8-10%
 * - md (3):  ~12-15%
 * - lg (4):  ~16-20%
 * - xl (5):  ~20-25%
 */
export const COLUMN_WEIGHTS: Record<ColumnSize, number> = {
  xs: 1,   // Extra pequeño (IDs, checkboxes, etiquetas cortas)
  sm: 2,   // Pequeño (estados, prioridades, tipos)
  md: 3,   // Medio (títulos, categorías, nombres cortos)
  lg: 4,   // Grande (descripciones, textos medianos)
  xl: 5,   // Extra grande (textos largos, contenido principal)
};