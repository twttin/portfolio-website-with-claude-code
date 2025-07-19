import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PasswordContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const PasswordContext = createContext<PasswordContextType | undefined>(undefined);

const PASSWORD = "portfolio2024"; // Change this to your desired password
const SESSION_KEY = "isAuthenticated";

export function PasswordProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    setIsAuthenticated(session === "true");
  }, []);

  const login = (password: string) => {
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_KEY, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <PasswordContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </PasswordContext.Provider>
  );
}

export function usePassword() {
  const context = useContext(PasswordContext);
  if (!context) {
    throw new Error("usePassword must be used within a PasswordProvider");
  }
  return context;
} 