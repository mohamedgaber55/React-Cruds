import { useState } from "react";
import { Auth } from "./AuthContextCreation";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  return <Auth.Provider value={{ token, setToken }}>{children}</Auth.Provider>;
}