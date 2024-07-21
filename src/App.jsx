import router from "./router";
import { RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "@/store/userSlice";
import { useEffect, useState } from "react";
import server from "./utils/server";
import { USER_INFO_ROUTE } from "./utils/constants";

const App = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await server.get(USER_INFO_ROUTE, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          dispatch(setUserInfo(response.data));
        } else {
          dispatch(setUserInfo(undefined));
        }
      } catch (error) {
        dispatch(setUserInfo(undefined));
      } finally {
        setLoading(false);
      }
    };
    if (!user) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [dispatch, user]);

  if (loading) {
    return <div>loading...</div>;
  }

  return <RouterProvider router={router} />;
};

export default App;
