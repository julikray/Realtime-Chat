import React, { useEffect, useRef } from "react";
import { useAppStore } from "@/store";

import CallScreen from "./CallScreen";
import { useSocket } from "@/context/SocketContext";

function VideoCall() {
  const { callData, endCall ,videoCall ,userInfo } = useAppStore();

  const socket = useSocket();




useEffect(() => {
    if (videoCall.type === "out-going"  && socket) {
      socket.emit("outgoing-video-call", {
        to: videoCall.recipient._id,
        from: {
          id: userInfo.id,
          // profileSetup: userInfo.profileSetup,
          name: userInfo.name,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall]);

  return <CallScreen data={videoCall} />;
}

export default VideoCall;



