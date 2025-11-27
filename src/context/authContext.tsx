import { api } from "@/utils/api-config";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { UserLogin } from "./Auth/Types/Auth.types"

type AuthContextType = {
  isAuthenticated: boolean;
  rol: string | null;
  Municipio: string | null;
  login: (
    accessToken: string,
    rol: string,
    Municipio: string,
    userData: UserLogin
  ) => void;
  isLoading: boolean;
  logout: () => void;
  user: UserLogin;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const [rol, setRol] = useState<string | null>(localStorage.getItem("rol"));
  const [Municipio, setMunicipio] = useState<string | null>(
    localStorage.getItem("Municipio")
  );
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.log("Error al parsear los datos del usuario:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (
    token: string,
    rol: string,
    Municipio: string,
    userData: any
  ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("rol", rol);
    localStorage.setItem("Municipio", Municipio);
    localStorage.setItem("user", JSON.stringify(userData));

    setIsAuthenticated(true);
    setRol(rol);
    setMunicipio(Municipio);
    setUser(userData);

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      await api.post("/logout");
    } catch (error) {
      console.log("Error during logout:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      localStorage.removeItem("Municipio");
      localStorage.removeItem("user");

      setIsAuthenticated(false);
      setRol(null);
      setMunicipio(null);
      setUser(null);
      setIsLoading(false);
      delete api.defaults.headers.common["Authorization"];
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, rol, Municipio, login, logout, isLoading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
