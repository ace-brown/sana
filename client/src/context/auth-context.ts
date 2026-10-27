import { createContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  // True once the stored session (if any) has been restored
  isAuthReady: boolean;
  token: string | null;
  userId: string | null;
  fullName: string | null;
  username: string | null;
  role: string | null;
  reportId: string | null;
  login: (
    uid: string,
    fullName: string,
    username: string,
    role: string,
    token: string,
    expirationDate?: Date
  ) => void;
  logout: () => void;
  getReportId: (reportId: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isAuthReady: false,
  userId: null,
  token: null,
  fullName: null,
  username: null,
  reportId: null,
  role: null,
  login: () => {},
  logout: () => {},
  getReportId: () => {},
});
