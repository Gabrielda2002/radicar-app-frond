import React, { createContext, useState, useContext, useEffect } from 'react';
import { IUsuarios } from "@/models/IUsuarios";
import { fetchUsuario } from "@/services/apiService";

interface UsersContextType {
    users: IUsuarios[];
    loading: boolean;
    error: string | null;
    updateUser: (updatedUser: IUsuarios) => void;
    refreshUsers: () => Promise<void>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [users, setUsers] = useState<IUsuarios[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refreshUsers = async () => {
        try {
            setLoading(true);
            const data = await fetchUsuario();
            setUsers(data);
            setError(null);
        } catch (error) {
            setError("Error al obtener los datos de la tabla usuarios o no tienes los permisos necesarios. " + error);
        } finally {
            setLoading(false);
        }
    };

    // Cargar usuarios al montar el componente
    useEffect(() => {
        refreshUsers();
    }, []);

    // Función para actualizar un usuario específico en el contexto
    const updateUser = (updatedUser: IUsuarios) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === updatedUser.id ? updatedUser : user
            )
        );
    };

    return (
        <UsersContext.Provider value={{ users, loading, error, updateUser, refreshUsers }}>
            {children}
        </UsersContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useUsers = (): UsersContextType => {
    const context = useContext(UsersContext);
    if (context === undefined) {
        throw new Error('useUsers debe ser usado dentro de UsersProvider');
    }
    return context;
};