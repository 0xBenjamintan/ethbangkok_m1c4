"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isWalletConnected: boolean;
  setIsWalletConnected: (value: boolean) => void;
  isVerified: boolean;
  setIsVerified: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const loadStates = () => {
      const savedIsWalletConnected =
        localStorage.getItem("isWalletConnected") === "true";
      const savedIsVerified = localStorage.getItem("isVerified") === "true";
      setIsWalletConnected(savedIsWalletConnected);
      setIsVerified(savedIsVerified);
    };
    loadStates();
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    localStorage.setItem("isWalletConnected", isWalletConnected.toString());
    localStorage.setItem("isVerified", isVerified.toString());
  }, [isWalletConnected, isVerified]);

  return (
    <AuthContext.Provider
      value={{
        isWalletConnected,
        setIsWalletConnected,
        isVerified,
        setIsVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
