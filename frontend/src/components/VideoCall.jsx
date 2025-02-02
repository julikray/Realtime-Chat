import React, { useEffect} from "react";
import { useAppStore } from "@/store";

import CallScreen from "./CallScreen";
import { useSocket } from "@/context/SocketContext";

function VideoCall() {
  const {  videoCall, userInfo } = useAppStore();

  const socket = useSocket();

  useEffect(() => {
    if (videoCall.type === "out-going" && socket) {
      socket.emit("outgoing-video-call", {
        to: videoCall.recipient._id,
        from: {
          id: userInfo.id,
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
