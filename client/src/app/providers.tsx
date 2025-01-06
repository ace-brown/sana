"use client";

import { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/context/auth-context";

let logoutTimer: NodeJS.Timeout | null = null;

export function Providers({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null
  );
  const router = useRouter();

  const login = useCallback(function (
    uid: string,
    fullName: string,
    token: string,
    expirationDate: Date
  ) {
    setToken(token);
    setUserId(uid);
    setFullName(fullName);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        fullName: fullName,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  },
  []);

  const logout = useCallback(
    function () {
      router.push("/");
      setToken(null);
      setUserId(null);
      setFullName(null);
      setTokenExpirationDate(null);
      localStorage.removeItem("userData");
    },
    [router]
  );

  useEffect(() => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    }
  }, [token, logout, tokenExpirationDate]);

  // Load user data from local storage on page load or if token changes
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      try {
        const parsedData: {
          userId: string;
          fullName: string;
          token: string;
          expiration: string;
        } = JSON.parse(storedData);

        if (
          parsedData.userId &&
          parsedData.fullName &&
          parsedData.token &&
          new Date(parsedData.expiration) > new Date()
        ) {
          login(
            parsedData.userId,
            parsedData.fullName,
            parsedData.token,
            new Date(parsedData.expiration)
          );
        }
      } catch (err) {
        console.error("Failed to parse user data:", err);
      }
    }
  }, [login]);

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
