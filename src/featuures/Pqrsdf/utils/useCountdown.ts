import { useEffect, useState } from "react";

/**
 * Hook que expone un timestamp (`tick`) que se actualiza cada `intervalMs`.
 * Útil para forzar re-renders periódicos en contadores en tiempo real.
 *
 * @param intervalMs - intervalo de actualización en ms (default: 1000)
 * @returns tick — valor actual de Date.now()
 *
 * @example
 * const tick = useCountdown();         // cada 1s
 * const tick = useCountdown(30_000);   // cada 30s
 */
export const useCountdown = (intervalMs: number = 1000): number => {
  const [tick, setTick] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTick(Date.now()), intervalMs);
    console.log('corriendo useEffect')
    return () => clearInterval(interval);
  }, [intervalMs]);

  return tick;
};
