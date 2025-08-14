import { useState, useEffect } from "react";
import axios from "axios";
import { useSecurityContext } from "../Context/SecurityContext";

function useAdminCheck() {
  const [auth, setAuth] = useState<boolean | null>(null);
  const { accessToken, setAccessToken } = useSecurityContext();

  useEffect(() => {
    const AdmineDashboardAuth = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/AdminDashboard`,
          {},
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        if (res && res.status === 200) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (err) {
        try {
          const res2 = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/refreshAdminToken`,
            {},
            {
              withCredentials: true,
            }
          );
          if (res2 && res2.status === 200) {
            const newAccessToken = res2.data.AccessToken;
            setAccessToken(newAccessToken);
            const res3 = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/AdminDashboard`,
              {},
              {
                headers: {
                  authorization: `Bearer ${newAccessToken}`,
                },
                withCredentials: true,
              }
            );
            if (res3 && res3.status == 200) {
              setAuth(true);
            } else {
              setAuth(false);
            }
          } else {
            setAuth(false);
          }
        } catch (err) {
          setAuth(false);
        }
      }
    };
    AdmineDashboardAuth();
  }, [accessToken, setAccessToken]);

  return auth;
}
export default useAdminCheck;
