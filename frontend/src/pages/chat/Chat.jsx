import { useAppStore } from "@/store";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./components/contacts-container/ContactsContainer";
import EmptyChatContainer from "./components/empty-chat-container/EmptyChatContainer";
import ChatContainer from "./components/chat-container/ChatContainer";
import VideoCall from "@/components/VideoCall";
import VoiceCall from "@/components/VoiceCall";
import IncomingVoiceCall from "@/components/IncomingVoiceCall";
import IncomingVideoCall from "@/components/IncomingVideoCall";
import { useSocket } from "@/context/SocketContext";

function Chat() {
  const {
    userInfo,
    selectedChatType,
    voiceCall,
    videoCall,
    endCall,
    setIncomingVoiceCall,
    setIncomingVideoCall,
    incomingVoiceCall,
    incomingVideoCall,
  } = useAppStore();

  const socket = useSocket();
  const navigate = useNavigate();
  const [socketInitialized, setSocketInitialized] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      toast.error("Unauthorized access. Redirecting to login.");
      navigate("/auth");
      return;
    }

    if (!userInfo.profileSetup) {
      toast("Please setup your profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (socket && !socketInitialized) {
      socket.on("incoming-voice-call", ({ from, roomId, callType }) => {
        setIncomingVoiceCall({ from, roomId, callType });
        console.log("incoming-voice", from);
      });

      socket.on("incoming-video-call", ({ from, roomId, callType }) => {
        setIncomingVideoCall({ from, roomId, callType });
      });

      socket.on("voice-call-rejected", () => {
        toast.info("Voice call was rejected.");
        endCall();
      });

      socket.on("video-call-rejected", () => {
        toast.info("Video call was rejected.");
        endCall();
      });

      setSocketInitialized(true);
    }
  }, [socket, socketInitialized, setIncomingVoiceCall, setIncomingVideoCall, endCall]);

  return (
    <>
      {incomingVoiceCall && <IncomingVoiceCall />}
      {incomingVideoCall && <IncomingVideoCall />}

      {voiceCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VoiceCall />
        </div>
      )}

      {videoCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VideoCall />
        </div>
      )}

      {!voiceCall && !videoCall && (
        <div className="flex h-[100vh] text-white overflow-hidden">
          <ContactsContainer />
          {selectedChatType === undefined ? (
            <EmptyChatContainer />
          ) : (
            <ChatContainer />
          )}
        </div>
      )}
    </>
  );
}

export default Chat;
