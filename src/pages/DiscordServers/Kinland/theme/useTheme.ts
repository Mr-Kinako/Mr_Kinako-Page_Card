// src/pages/DiscordServers/Kinland/theme/useTheme.ts

import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "kinland-theme";

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "light" ? "light" : "dark"; // тёмная по умолчанию
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, setTheme, toggleTheme };
};
