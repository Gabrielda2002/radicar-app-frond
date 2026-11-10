import { create } from "zustand";
import type { ITurnoTvItem, ITurnoTvState } from "@/models/ITurnos";
import { fetchTurnoTvState, getTurnoError } from "../services/turnos.service";

interface UseStoreTurnoTv {
  data: ITurnoTvState | null;
  error: string | null;
  isLoading: boolean;
  isLiveConnected: boolean;
  isOutdated: boolean;
  version: number;
  highlightedTurnoId: number | null;
  load: (slug: string) => Promise<void>;
  setIsLiveConnected: (connected: boolean) => void;
  setIsOutdated: (outdated: boolean) => void;
  setHighlightedTurnoId: (id: number | null) => void;
  addOrUpdateTurn: (turn: Partial<ITurnoTvItem> & { turnoId: number }) => void;
  removeTurn: (turnoId: number) => void;
  reset: () => void;
}

export const useStoreTurnoTv = create<UseStoreTurnoTv>((set, get) => ({
  data: null,
  error: null,
  isLoading: false,
  isLiveConnected: false,
  isOutdated: false,
  version: 0,
  highlightedTurnoId: null,

  load: async (slug: string) => {
    const version = get().version + 1;
    set({
      version,
      error: null,
      isLoading: true,
      data: get().data?.headquarter.slug === slug ? get().data : null,
    });

    try {
      const data = await fetchTurnoTvState(slug);
      if (get().version === version) {
        const currentHighlight = get().highlightedTurnoId;
        const stillPresent =
          Boolean(currentHighlight) &&
          data.activeTurns.some((t) => t.turnoId === currentHighlight);
        const firstCalled = data.activeTurns.find((t) => t.status === "LLAMADO");
        const nextHighlight = stillPresent
          ? currentHighlight
          : (firstCalled ? firstCalled.turnoId : (data.activeTurns[0]?.turnoId ?? null));

        set({
          data,
          highlightedTurnoId: nextHighlight,
        });
      }
    } catch (error: unknown) {
      if (get().version === version) {
        set({ error: getTurnoError(error) });
      }
    } finally {
      if (get().version === version) {
        set({ isLoading: false });
      }
    }
  },

  setIsLiveConnected: (isLiveConnected) => set({ isLiveConnected }),

  setIsOutdated: (isOutdated) => set({ isOutdated }),

  setHighlightedTurnoId: (highlightedTurnoId) => set({ highlightedTurnoId }),

  addOrUpdateTurn: (turn) => {
    const currentData = get().data;
    if (!currentData) return;

    const existingIndex = currentData.activeTurns.findIndex(
      (t) => t.turnoId === turn.turnoId
    );

    let updatedTurns: ITurnoTvItem[];

    if (existingIndex >= 0) {
      const existing = currentData.activeTurns[existingIndex];
      const merged: ITurnoTvItem = {
        ...existing,
        ...turn,
      };
      const remaining = currentData.activeTurns.filter(
        (t) => t.turnoId !== turn.turnoId
      );
      updatedTurns = [merged, ...remaining].slice(0, 10);
    } else {
      const newTurn: ITurnoTvItem = {
        ...turn,
        ticketCode: turn.ticketCode ?? "",
        priority: turn.priority ?? "GENERAL",
        status: turn.status ?? "LLAMADO",
        advisorName: turn.advisorName ?? null,
        turnoId: turn.turnoId,
      };
      updatedTurns = [newTurn, ...currentData.activeTurns].slice(0, 10);
    }

    set({
      data: {
        ...currentData,
        activeTurns: updatedTurns,
      },
    });
  },

  removeTurn: (turnoId) => {
    const currentData = get().data;
    if (!currentData) return;

    const updatedTurns = currentData.activeTurns.filter(
      (t) => t.turnoId !== turnoId
    );
    set({
      data: {
        ...currentData,
        activeTurns: updatedTurns,
      },
      highlightedTurnoId:
        get().highlightedTurnoId === turnoId ? null : get().highlightedTurnoId,
    });
  },

  reset: () =>
    set({
      data: null,
      error: null,
      isLoading: false,
      isLiveConnected: false,
      isOutdated: false,
      version: get().version + 1,
      highlightedTurnoId: null,
    }),
}));
