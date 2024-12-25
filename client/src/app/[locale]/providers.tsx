"use client";

import { useCallback, useState } from "react";
import { ThemeProvider } from "next-themes";

import { AuthContext } from "@/context/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(function () {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(function () {
    setIsLoggedIn(false);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
      >
        {children}
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
