import { createContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (uid: string, fullName: string) => void;
  logout: () => void;
  userId: string | null;
  fullName: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
  fullName: null,
});
