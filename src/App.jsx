import useGetUser from "./hooks/useGetUser";
import router from "./router";
import { RouterProvider } from "react-router-dom";

const App = () => {
  const { loading } = useGetUser();

  if (loading) {
    return <div>loading...</div>;
  }

  return <RouterProvider router={router} />;
};

export default App;
