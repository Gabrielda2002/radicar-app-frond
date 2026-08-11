/**
 * Convierte una fecha límite SLA a string legible de tiempo restante.
 * Retorna null si la fecha es inválida, "Vencido" si ya pasó.
 *
 * @param slaDeadLineAt - fecha como string ISO del backend o Date
 * @param now            - timestamp actual en ms (Date.now())
 * @returns "Xh Ym Zs" | "Vencido" | null
 */
export const formatTimeRemaining = (
  slaDeadLineAt: Date | string | null,
  now: number,
): string | null => {
  if (!slaDeadLineAt) return null;

  const deadlineDate =
    slaDeadLineAt instanceof Date ? slaDeadLineAt : new Date(slaDeadLineAt);
  if (isNaN(deadlineDate.getTime())) return null;

  const diffMs = deadlineDate.getTime() - now;
  if (diffMs <= 0) return "Vencido";

  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return `${totalHours}h ${minutes}m ${seconds}s`;
};
