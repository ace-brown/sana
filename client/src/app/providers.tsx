"use client";

import { useCallback, useState } from "react";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/context/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const router = useRouter();

  const login = useCallback(function (
    uid: string,
    fullName: string,
    token: string
  ) {
    setToken(token);
    setUserId(uid);
    setFullName(fullName);
  },
  []);

  const logout = useCallback(function () {
    router.push("/");
    setToken(null);
    setUserId(null);
    setFullName(null);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          login: login,
          logout: logout,
          userId: userId,
          fullName: fullName,
        }}
      >
        {children}
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
