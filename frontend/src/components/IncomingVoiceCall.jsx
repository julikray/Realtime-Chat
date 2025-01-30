import { useSocket } from "@/context/SocketContext";
import { useAppStore } from "@/store";
import React from "react";
import { Avatar } from "./ui/avatar";

function IncomingVoiceCall() {
  const { incomingVoiceCall, setIncomingVoiceCall } = useAppStore();

  const socket = useSocket();

  const acceptCall = () => {
    console.log("✅ Accepting call from:", incomingVoiceCall);

    socket.emit("accept-incoming-call", { id: incomingVoiceCall.from });

    // Remove incoming call notification
    setIncomingVoiceCall(undefined);
  };

  const rejectCall = () => {
    console.log("❌ Rejecting call from:", incomingVoiceCall);

    socket.emit("reject-incoming-call", { id: incomingVoiceCall.from });

    // Remove incoming call notification
    setIncomingVoiceCall(undefined);
  };

  // 🔍 Prevent error if `incomingVoiceCall` is undefined
  if (!incomingVoiceCall) return null;

  return (
    <div className="h-24 w-80 fixed bottom-8 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-[#2a2b33] text-white shadow-lg border-2 border-[#741bda]">
      <Avatar
        src={incomingVoiceCall.profileSetup || "/default-avatar.png"} // ✅ Default Avatar
        alt="avatar"
        height={70}
        width={70}
        className="rounded-full"
      />

      <div>
        <div>{incomingVoiceCall.firstName || "Unknown Caller"}</div>
        <div className="text-xs">Incoming Voice Call</div>

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
