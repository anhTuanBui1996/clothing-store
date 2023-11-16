import { createContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  userInfo: null,
});

export default AuthContext