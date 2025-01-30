// import { useAppStore } from "@/store";
// import React from "react";
// import { Avatar } from "./ui/avatar";
// import { useSocket } from "@/context/SocketContext";
// import reducer from "@/store/reducer/reducers";

// function IncomingVideoCall() {
//   const { incomingVideoCall ,setIncomingVideoCall ,setVideoCall , videoCall} = useAppStore();
//   const socket = useSocket();

//   const acceptCall = () => {
//     // console.log("✅ Accepting call from:", incomingVideoCall);

//     // socket.emit("accept-incoming-call", { id: incomingVideoCall.from });

//     // // Remove incoming call notification
//     // setIncomingVideoCall(undefined);
//     setVideoCall({ ...incomingVideoCall, type: "in-coming" });
//     setIncomingVideoCall(undefined);

//     // Emit event to server
//     socket.emit("accept-incoming-call", { id: incomingVideoCall.id });

//   };

//   const rejectCall = () => {
//     // console.log("❌ Rejecting call from:", incomingVideoCall);

//     // socket.emit("reject-incoming-call", { id: incomingVideoCall.from });

//     // // Remove incoming call notification
//     // setIncomingVideoCall(undefined);

//     socket.emit("reject-video-call" , { from:   videoCall.id    })
//     dispatchEvent({type: reducer.endCall});
//   };

//   // 🔍 Prevent error if `incomingVideoCall` is undefined
//   if (!incomingVideoCall) return null;

//   return (
//     <div className="h-24 w-80 fixed bottom-8 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-[#2a2b33] text-white shadow-lg border-2 border-[#741bda]">
//       <Avatar
//         src={incomingVideoCall.profileSetup || "/default-avatar.png"} // ✅ Default Avatar
//         alt="avatar"
//         height={70}
//         width={70}
//         className="rounded-full"
//       />

//       <div>
//         <div>{incomingVideoCall.firstName || "Unknown Caller"}</div> 
//         <div className="text-xs">Incoming Video Call</div>

//         <div className="flex gap-2 mt-2">
//           <button className="bg-red-500 p-1 px-3 text-sm rounded-full" onClick={rejectCall}>
//             Reject
//           </button>
//           <button className="bg-green-500 p-1 px-3 text-sm rounded-full" onClick={acceptCall}>
//             Accept
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default IncomingVideoCall;






import { useAppStore } from "@/store";
import React from "react";
import { Avatar } from "./ui/avatar";
import { useSocket } from "@/context/SocketContext";

function IncomingVideoCall() {
  const { incomingVideoCall, setIncomingVideoCall, setVideoCall, videoCall, endCall } = useAppStore();
  const socket = useSocket();

  const acceptCall = () => {
    console.log("✅ Accepting call from:", incomingVideoCall);

    // Set the video call state to indicate an active incoming call
    setVideoCall({ ...incomingVideoCall, type: "in-coming" });

    // Remove the incoming call notification
    setIncomingVideoCall(undefined);

    // Notify the caller that the call has been accepted
    socket.emit("accept-incoming-call", { id: incomingVideoCall.id });
  };

  const rejectCall = () => {
    console.log("❌ Rejecting call from:", incomingVideoCall);

    // Emit event to server notifying rejection
    socket.emit("reject-video-call", { from: incomingVideoCall.id });

    // End call and clear state
    endCall();
  };

  if (!incomingVideoCall) return null;

  return (
    <div className="h-24 w-80 fixed bottom-8 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-[#2a2b33] text-white shadow-lg border-2 border-[#741bda]">
      <Avatar
        src={incomingVideoCall.profileSetup || "/default-avatar.png"}
        alt="avatar"
        height={70}
        width={70}
        className="rounded-full"
      />

      <div>
        <div>{incomingVideoCall.firstName || "Unknown Caller"}</div>
        <div className="text-xs">Incoming Video Call</div>

        <div className="flex gap-2 mt-2">
          <button className="bg-red-500 p-1 px-3 text-sm rounded-full" onClick={rejectCall}>
            Reject
          </button>
          <button className="bg-green-500 p-1 px-3 text-sm rounded-full" onClick={acceptCall}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncomingVideoCall;
