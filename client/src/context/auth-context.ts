import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  // ownerId: null,
  login: () => {},
  logout: () => {},
});
