import { useSocket } from "@/context/SocketContext";
import { useAppStore } from "@/store";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";

function IncomingVoiceCall() {
  const { incomingVoiceCall, setIncomingVoiceCall , endCall ,setVoiceCall } = useAppStore();

  const socket = useSocket();

  const acceptCall = () => {
   
    // console.log("✅ Accepting call from:", incomingVoiceCall);

    setVoiceCall({ ...incomingVoiceCall, type: "in-coming" });

    setIncomingVoiceCall(undefined);

    socket.emit("accept-incoming-call", { id: incomingVoiceCall?.from?.id });

  };

  const rejectCall = () => {
    socket.emit("reject-voice-call", { from: incomingVoiceCall?.from?.id });

    endCall();
  
    // console.log("❌ Rejecting call from:", incomingVoiceCall);

  };

  
  if (!incomingVoiceCall) return null;

  console.log("Incoming Voice Call Data:", incomingVoiceCall);

  return (
    <div className="h-24 w-80 fixed bottom-8 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-[#1c1d25]  text-white shadow-lg border-2 border-[#741bda]">
     
      <Avatar className="h-12 w-12 rounded-full overflow-hidden">
        {incomingVoiceCall?.from?.image ? (
          <AvatarImage
            src={`${HOST}/${incomingVoiceCall?.from?.image}`}
            alt="profile"
            className="object-cover w-full h-full bg-black"
          />
        ) : (
          <div
            className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
              incomingVoiceCall?.from?.color
            )} `}
          >
            {incomingVoiceCall?.from?.firstName
              ? incomingVoiceCall?.from?.firstName.charAt(0)
              : incomingVoiceCall?.from?.email
              ? incomingVoiceCall?.from?.email.charAt(0)
              : "?"}
          </div>
        )}
      </Avatar>

      <div>
        <div>
          {`${incomingVoiceCall?.from?.firstName || "Unknown"} ${
            incomingVoiceCall?.from?.lastName || ""
          }` ||
            incomingVoiceCall?.from?.email ||
            "Unknown"}
        </div>
        <div className="text-xs text-gray-500 ">Incoming Voice Call</div>

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

export default IncomingVoiceCall;
