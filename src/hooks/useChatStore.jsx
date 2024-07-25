import { useSelector, useDispatch } from "react-redux";
import {
  setType,
  setData,
  setMessage,
  setClose,
  addMessage,
  setChatContacts,
  setChannels,
  addChannels,
  addContacts,
} from "@/store/chatSlice";

function useChatStore() {
  const store = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const setChatType = (data) => dispatch(setType(data));
  const setChatData = (data) => dispatch(setData(data));
  const setChatMessage = (data) => dispatch(setMessage(data));
  const setChatClose = () => dispatch(setClose());
  const addChatMessage = (data) => dispatch(addMessage(data));
  const setContacts = (data) => dispatch(setChatContacts(data));
  const setChatChannels = (data) => dispatch(setChannels(data));
  const addChatChannels = (data) => dispatch(addChannels(data));
  const addChatContacts = (data) => dispatch(addContacts(data));

  return {
    ...store,
    setChatType,
    setChatData,
    setChatMessage,
    setChatClose,
    addChatMessage,
    setContacts,
    setChatChannels,
    addChatChannels,
    addChatContacts,
  };
}

export default useChatStore;
