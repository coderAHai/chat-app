import useGetUser from "./hooks/useGetUser";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import LoadingAnimation from "./components/animation/LoadingAnimation";

const App = () => {
  const { loading } = useGetUser();

  return loading ? <LoadingAnimation /> : <RouterProvider router={router} />;
};

export default App;
