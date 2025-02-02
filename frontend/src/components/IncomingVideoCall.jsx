import { useAppStore } from "@/store";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useSocket } from "@/context/SocketContext";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";

function IncomingVideoCall() {
  const {
    incomingVideoCall,
    setIncomingVideoCall,
    setVideoCall,
    videoCall,
    endCall,
  } = useAppStore();
  const socket = useSocket();

  const acceptCall = () => {
    // console.log("✅ Accepting call from:", incomingVideoCall);

    setVideoCall({ ...incomingVideoCall, type: "in-coming" });

    setIncomingVideoCall(undefined);

    socket.emit("accept-incoming-call", { id: incomingVideoCall?.from?.id });
  };



  const rejectCall = () => {
    socket.emit("reject-video-call", { from: incomingVideoCall?.from?.id });

    endCall();
    // console.log("❌ Rejecting call from:", incomingVideoCall);
  };

  if (!incomingVideoCall) return null;

  console.log("Incoming Video Call Data:", incomingVideoCall);

  return (
    <div className="h-24 w-80 fixed bottom-8 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-[#1c1d25]  text-white shadow-lg border-2 border-[#741bda]">
      {/* Avatar */}
      <Avatar className="h-12 w-12 rounded-full overflow-hidden">
        {incomingVideoCall?.from?.image ? (
          <AvatarImage
            src={`${HOST}/${incomingVideoCall?.from?.image}`}
            alt="profile"
            className="object-cover w-full h-full bg-black"
          />
        ) : (
          <div
            className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
              incomingVideoCall?.from?.color
            )} `}
          >
            {incomingVideoCall?.from?.firstName
              ? incomingVideoCall?.from?.firstName.charAt(0)
              : incomingVideoCall?.from?.email
              ? incomingVideoCall?.from?.email.charAt(0)
              : "?"}
          </div>
        )}
      </Avatar>

      <div>
        <div>
          {`${incomingVideoCall?.from?.firstName || "Unknown"} ${
            incomingVideoCall?.from?.lastName || ""
          }` ||
            incomingVideoCall?.from?.email ||
            "Unknown"}
        </div>
        <div className="text-xs text-gray-500 ">Incoming Video Call</div>

        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 p-1 px-3 text-sm rounded-full"
            onClick={rejectCall}
          >
            Reject
          </button>
          <button
            className="bg-green-500 p-1 px-3 text-sm rounded-full"
            onClick={acceptCall}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncomingVideoCall;
