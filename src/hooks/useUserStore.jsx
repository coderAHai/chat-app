import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "@/store/userSlice";
function useUserStore() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const setUser = (data) => dispatch(setUserInfo(data));

  return { user, setUser };
}

export default useUserStore;
