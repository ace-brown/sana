"use client";

import { useCallback, useState } from "react";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/context/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const router = useRouter();

  const login = useCallback(function (uid: string, fullName: string) {
    setIsLoggedIn(true);
    setUserId(uid);
    setFullName(fullName);
  }, []);

  const logout = useCallback(function () {
    setIsLoggedIn(false);
    setUserId(null);
    setFullName(null);
    router.push("/");
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
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
