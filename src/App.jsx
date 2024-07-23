import { RouterProvider } from "react-router-dom";
import router from "./router";
import LoadingAnimation from "./components/animation/LoadingAnimation";
import { Toaster } from "./components/ui/sonner.jsx";
import useGetUser from "./hooks/useGetUser";

const App = () => {
  const { loading } = useGetUser();

  return loading ? (
    <LoadingAnimation />
  ) : (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" closeButton />
    </>
  );
};

export default App;
