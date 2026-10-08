// src/pages/DiscordServers/Kinland/KinlandAuthContext.tsx

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { kinlandApi } from "./api/kinlandApi";
import type { DiscordUser } from "./api/types";

interface KinlandAuthContextType {
  user: DiscordUser | null;
  isLoadingUser: boolean;
  isAuthenticated: boolean;
  isAuthOverlayOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  executeWithAuth: (action: () => void) => void;
  setUser: React.Dispatch<React.SetStateAction<DiscordUser | null>>;
  refreshUser: () => Promise<DiscordUser | null>;
  logout: () => Promise<void>;
}

const KinlandAuthContext = createContext<KinlandAuthContextType | undefined>(undefined);

export const KinlandAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isAuthOverlayOpen, setIsAuthOverlayOpen] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const refreshUser = useCallback(async () => {
    setIsLoadingUser(true);
    try {
      const userData = await kinlandApi.getMe();
      setUser(userData);
      return userData;
    } catch {
      setUser(null);
      return null;
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const openAuthModal = useCallback(() => {
    if (!isAuthenticated) {
      setIsAuthOverlayOpen(true);
    }
  }, [isAuthenticated]);

  const closeAuthModal = useCallback(() => {
    setIsAuthOverlayOpen(false);
  }, []);

  const executeWithAuth = useCallback(
    (action: () => void) => {
      if (isAuthenticated) {
        action();
      } else {
        setIsAuthOverlayOpen(true);
      }
    },
    [isAuthenticated],
  );

  const logout = useCallback(async () => {
    try {
      await kinlandApi.logout();
      setUser(null);
      setIsAuthOverlayOpen(false);
      navigate("/kinland", { replace: true });
    } catch (err) {
      console.error("[Logout Error]:", err);
    }
  }, [navigate]);

  return (
    <KinlandAuthContext.Provider
      value={{
        user,
        isLoadingUser,
        isAuthenticated,
        isAuthOverlayOpen,
        openAuthModal,
        closeAuthModal,
        executeWithAuth,
        setUser,
        refreshUser,
        logout,
      }}
    >
      {children}
    </KinlandAuthContext.Provider>
  );
};

export const useKinlandAuth = () => {
  const context = useContext(KinlandAuthContext);
  if (!context) {
    throw new Error("useKinlandAuth должен использоваться внутри KinlandAuthProvider");
  }
  return context;
};
