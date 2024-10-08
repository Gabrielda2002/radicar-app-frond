import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    rol: string | null;
    Municipio: string | null;
    login: (token: string, rol: string, Municipio: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
    const [rol, setRol] = useState<string | null>(localStorage.getItem('rol'));
    const [Municipio, setMunicipio] = useState<string | null>(localStorage.getItem('Municipio'));

    const login = (token: string, rol: string, Municipio: string) => {
        localStorage.setItem('token', token);  // Aquí deberías guardar el token real que obtienes del backend
        localStorage.setItem('rol', rol);  // Guardar el rol en localStorage
        localStorage.setItem('Municipio', Municipio);  // Guardar el municipio en localStorage
        setIsAuthenticated(true);
        setRol(rol);
        setMunicipio(Municipio);
    };

    const logout = () => {
        localStorage.removeItem('token');  // Asegúrate de que 'token' es el nombre correcto
        localStorage.removeItem('rol');  // Elimina el rol del usuario
        localStorage.removeItem('Municipio');  // Elimina el municipio del usuario
        localStorage.removeItem('user');  // Elimina el usuario
        setIsAuthenticated(false);
        setRol(null);
        setMunicipio(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated,rol, Municipio ,login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
