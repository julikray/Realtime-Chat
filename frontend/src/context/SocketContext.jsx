import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef(null); 
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleRecieveMessage = (message) => {
        const { selectedChatData, addMessage ,addContactsInDMContacts } = useAppStore.getState();

        if (
          selectedChatData &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          addMessage(message);
          // console.log("message rcv" , message)
        }
        addContactsInDMContacts(message);
      };


      const handleRecieveChannelMessage = (message) => {
        const { selectedChatData, selectedChatType , addMessage ,addChannelInChannelList } = useAppStore.getState();

        if (
          selectedChatType !== undefined && selectedChatData._id === message.channelId
        ) {
          addMessage(message);
            console.log("message channel" , message)
        }
        addChannelInChannelList(message);
      };


      if (socket.current) {
        socket.current.on("recieveMessage", handleRecieveMessage);
      }


      if (socket.current) {
        // Safely add event listeners
        socket.current.on("recieve-channel-message", handleRecieveChannelMessage);
      }

      return () => {
        if (socket.current) {
          // Safely remove event listeners and disconnect
          socket.current.off("recieveMessage", handleRecieveMessage);
          socket.current.disconnect();
        }
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
