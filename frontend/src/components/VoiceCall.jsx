import React, { useEffect } from "react";
import { useAppStore } from "@/store";
import CallScreen from "./CallScreen";
import { useSocket } from "@/context/SocketContext";

function VoiceCall() {
  const { callData, endCall, voiceCall, userInfo } = useAppStore();

  const socket = useSocket();
  


  // useEffect(() => {
  //   // Initialize socket connection
  //   socket.current = io("http://localhost:4000"); // Replace with your backend socket server URL

  //   return () => {
  //     // if (socket.current) {
  //     //   socket.current.disconnect(); // Cleanup on component unmount
  //     // }
  //   };
  // }, []);



  useEffect(() => {
    if (voiceCall.type === "out-going" && socket) {
     
      socket.emit("outgoing-voice-call", {
         to: voiceCall.recipient._id,
        from: {
          id: userInfo.id,
          // profileSetup: userInfo.profileSetup,
          firstName: userInfo.firstName,
        },
        callType: voiceCall.callType,
        roomId: voiceCall.roomId,
      });
    }
  }, [voiceCall , userInfo]);

  return <CallScreen data={voiceCall} />;
}

export default VoiceCall;
