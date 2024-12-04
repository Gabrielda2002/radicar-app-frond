import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
    isAuthenticated: boolean;
    rol: string | null;
    Municipio: string | null;
    login: (token: string, rol: string, Municipio: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
    const [rol, setRol] = useState<string | null>(localStorage.getItem('rol'));
    const [Municipio, setMunicipio] = useState<string | null>(localStorage.getItem('Municipio'));

    const login = (token: string, rol: string, Municipio: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('rol', rol);
        localStorage.setItem('Municipio', Municipio);
        setIsAuthenticated(true);
        setRol(rol);
        setMunicipio(Municipio);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('Municipio');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setRol(null);
        setMunicipio(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, rol, Municipio, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};