import { useSelector, useDispatch } from "react-redux";
import { setType, setData, setMessage, close } from "@/store/chatSlice";

function useChatStore() {
  const store = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const setChatType = (data) => dispatch(setType(data));
  const setChatData = (data) => dispatch(setData(data));
  const setChatMessage = (data) => dispatch(setMessage(data));
  const closeChat = () => dispatch(close());

  return { store, setChatType, setChatData, setChatMessage, closeChat };
}

export default useChatStore;
