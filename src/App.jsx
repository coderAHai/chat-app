import router from "./router";
import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import server from "./utils/server";
import { USER_INFO_ROUTE } from "./utils/constants";
import useUserStore from "./hooks/useUserStore";

const App = () => {
  const { user, setUserData } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await server.get(USER_INFO_ROUTE, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          setUserData(response.data);
        } else {
          setUserData(undefined);
        }
      } catch (error) {
        setUserData(undefined);
      } finally {
        setLoading(false);
      }
    };
    if (!user) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>loading...</div>;
  }

  return <RouterProvider router={router} />;
};

export default App;
