import useChatStore from "@/hooks/useChatStore";
import useUserStore from "@/hooks/useUserStore";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import store from "@/store/index";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { user } = useUserStore();
  const { addChatMessage } = useChatStore();

  useEffect(() => {
    if (user) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: user.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server.");
      });

      const handleRecieveMessage = async (message) => {
        const { data, type } = store.getState().chat;
        if (
          type !== null &&
          (data._id === message.sender._id ||
            data._id === message.recipient._id)
        ) {
          addChatMessage(message);
        }
      };

      socket.current.on("recieveMessage", handleRecieveMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
