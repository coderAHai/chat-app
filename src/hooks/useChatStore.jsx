import { useSelector, useDispatch } from "react-redux";
import { setType, setData, setMessage, setClose } from "@/store/chatSlice";

function useChatStore() {
  const store = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const setChatType = (data) => dispatch(setType(data));
  const setChatData = (data) => dispatch(setData(data));
  const setChatMessage = (data) => dispatch(setMessage(data));
  const setChatClose = () => dispatch(setClose());

  return { ...store, setChatType, setChatData, setChatMessage, setChatClose };
}

export default useChatStore;
