import { createContext, useContext, useState } from "react";

const SecurityContext = createContext<any>(null);
export const useSecurityContext = () => useContext(SecurityContext);
export default function TokenProvider({ children }: any) {
  const [accessToken, setAccessTokenState] = useState(
    () => localStorage.getItem("accessToken") || ""
  );

  const setAccessToken = (token: string) => {
    setAccessTokenState(token);
    localStorage.setItem("accessToken", token);
  };

  return (
    <SecurityContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </SecurityContext.Provider>
  );
}
