import { useSelector, useDispatch } from "react-redux";
import { setData } from "@/store/userSlice";

function useUserStore() {
  const store = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const setUserData = (data) => dispatch(setData(data));

  return { ...store, setUserData };
}

export default useUserStore;
