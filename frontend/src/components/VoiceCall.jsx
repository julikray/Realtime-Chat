import React, { useEffect } from "react";
import { useAppStore } from "@/store";
import CallScreen from "./CallScreen";
import { useSocket } from "@/context/SocketContext";

function VoiceCall() {
  const {  voiceCall, userInfo } = useAppStore();

  const socket = useSocket();

  useEffect(() => {
    if (voiceCall.type === "out-going" && socket) {
      socket.emit("outgoing-voice-call", {
        to: voiceCall.recipient._id,
        from: {
          id: userInfo.id,
          firstName: userInfo.firstName,
        },
        callType: voiceCall.callType,
        roomId: voiceCall.roomId,
      });
    }
  }, [voiceCall, userInfo]);

  return <CallScreen data={voiceCall} />;
}

export default VoiceCall;
