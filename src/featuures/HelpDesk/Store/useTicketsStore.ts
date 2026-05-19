import { DeskSource, ITickets, ITicketsWithSource } from "@/featuures/HelpDesk/types/ITickets";
import { api } from "@/utils/api-config";
import { create } from "zustand";


const ENDPOINT_SOURCE_MAP: Record<string, DeskSource> = {
    "/tickets-table": "sistemas",
    "/infrastructure-tickets/table": "infraestructura",
    "/sst-tickets/table": "sst"
};

const SOURCE_ENDPOINT_MAP: Record<DeskSource, string> = {
    "sistemas": "/tickets-table",
    "infraestructura": "/infrastructure-tickets/table",
    "sst": "/sst-tickets/table"
};

const ENDPOINT_USER_MAP: Record<string, string> = {
    "/tickets-table": "/tickets/user",
    "/infrastructure-tickets/table": "/infrastructure-tickets/user",
    "/sst-tickets/table": "/sst-tickets/user"
};

interface DeskState {
    tickets: ITicketsWithSource[];
    error: string | null;
    isLoading: boolean;
}

interface UseTicketsStoreReturn {
    tickets: ITicketsWithSource[];
    error: string | null;
    isLoading: boolean;
    fetchTickets: (endpoints?: string[]) => Promise<void>;
    createTicket: (endpoint: string, data: Object, onSuccess?: () => void) => Promise<void>;
    fetchUserTicketsByEndpoint: (endpoint: string, userId: number) => Promise<void>;
    deskState: Record<DeskSource, DeskState>;
    fetchDeskTickets: (source: DeskSource) => Promise<void>;
}

const initialDeskState: Record<DeskSource, DeskState> = {
    sistemas: { tickets: [], error: null, isLoading: false },
    infraestructura: { tickets: [], error: null, isLoading: false },
    sst: { tickets: [], error: null, isLoading: false },
};

const useTicketsStore = create<UseTicketsStoreReturn>((set) => ({
    tickets: [],
    error: null,
    isLoading: false,
    deskState: initialDeskState,

    fetchDeskTickets: async (source: DeskSource) => {
        const endpoint = SOURCE_ENDPOINT_MAP[source];
        set((state) => ({
            deskState: {
                ...state.deskState,
                [source]: { ...state.deskState[source], isLoading: true, error: null },
            },
        }));

        try {
            const response = await api.get(endpoint);
            const ticketsWithSource: ITicketsWithSource[] = response.data.map((ticket: ITickets) => ({
                ...ticket,
                _source: source,
            }));

            set((state) => ({
                deskState: {
                    ...state.deskState,
                    [source]: { tickets: ticketsWithSource, error: null, isLoading: false },
                },
            }));
        } catch (error: any) {
            if (error?.response?.status === 404) {
                set((state) => ({
                    deskState: {
                        ...state.deskState,
                        [source]: { tickets: [], error: null, isLoading: false },
                    },
                }));
            } else if (error?.response?.status === 500) {
                set((state) => ({
                    deskState: {
                        ...state.deskState,
                        [source]: {
                            tickets: [],
                            error: "Error del servidor. Por favor, inténtalo de nuevo más tarde.",
                            isLoading: false,
                        },
                    },
                }));
            } else {
                set((state) => ({
                    deskState: {
                        ...state.deskState,
                        [source]: {
                            tickets: [],
                            error: error.response?.data?.message || "Error al cargar los tickets",
                            isLoading: false,
                        },
                    },
                }));
            }
        }
    },

    fetchTickets: async (endpoints = ["/tickets-table"]) => {
        try {
            set({ isLoading: true, error: null });

            const responses = await Promise.all(endpoints.map((ep) => api.get(ep)));
            const combined: ITicketsWithSource[] = responses.flatMap((r, i) =>
                r.data.map((ticket: ITickets) => ({
                    ...ticket,
                    _source: ENDPOINT_SOURCE_MAP[endpoints[i]] ?? "sistemas",
                }))
            );

            set({ tickets: combined, error: null });

        } catch (error: any) {
            if (error.response?.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtelo de nuevo más tarde." });
            } else {
                set({ error: error.response?.data?.message || "Error desconocido. Por favor, inténtelo de nuevo." });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    createTicket: async (endpoint, data, onSuccess) => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.post(endpoint, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201 || response.status === 200) {
                onSuccess?.();
            }

        } catch (error: any) {
            if (error.response?.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtelo de nuevo más tarde." });
            } else {
                set({ error: error.response?.data?.message || "Error desconocido. Por favor, inténtelo de nuevo." });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    fetchUserTicketsByEndpoint: async (endpoint: string, userId: number) => {
        try {
            set({ isLoading: true, error: null });

            const userEndpoint = ENDPOINT_USER_MAP[endpoint] + `/${userId}`;
            const response = await api.get(userEndpoint);

            const ticketsWithSource: ITicketsWithSource[] = response.data.map((ticket: ITickets) => ({
                ...ticket,
                _source: ENDPOINT_SOURCE_MAP[endpoint] ?? "sistemas",
            }));

            set({ tickets: ticketsWithSource, error: null });

        } catch (error: any) {
            if (error?.response?.status === 404) {
                set({ tickets: [], error: null });
            } else if (error?.response?.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtalo de nuevo más tarde." });
            } else {
                set({ error: error.response?.data?.message || "Error al cargar los tickets" });
            }
        } finally {
            set({ isLoading: false });
        }
    }

}));

export default useTicketsStore;