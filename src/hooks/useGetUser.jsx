import { useEffect, useState } from "react";
import useUserStore from "./useUserStore";
import server from "@/utils/server";
import { COOKIE_KEY, USER_INFO_ROUTE } from "@/utils/constants";
import getCookie from "@/utils/cookie";

function useGetUser() {
  const { user, setUserData } = useUserStore();
  const [loading, setLoading] = useState(true);
  const cookie = getCookie(COOKIE_KEY);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await server.get(USER_INFO_ROUTE, {
          withCredentials: true,
        });
        setUserData(data);
      } catch (error) {
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };
    if (!user && cookie) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  return { loading };
}

export default useGetUser;
