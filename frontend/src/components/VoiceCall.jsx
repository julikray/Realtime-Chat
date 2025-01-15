// import React from "react";
// import { useAppStore } from "@/store";

// function VoiceCall() {
//   const { callData, endCall } = useAppStore();

//   if (!callData) return null;

//   return (
//     <div className="voice-call">
//       <h1>Voice Call with {callData.recipientName}</h1>
//       <button onClick={endCall}>End Call</button>
//     </div>
//   );
// }

// export default VoiceCall;



// import React from "react";
// import { useAppStore } from "@/store";
// import CallScreen from "./CallScreen";


// function VoiceCall() {

//   const { callData, endCall , socket , startVoiceCall } = useAppStore();

//   return (
//     <CallScreen data={startVoiceCall} />
//   );
// }

// export default VoiceCall;


import React from "react";
import { useAppStore } from "@/store";
import CallScreen from "./CallScreen";
import { useNavigate } from "react-router-dom";

function VoiceCall() {
   const { callData, endCall } = useAppStore();
    const navigate = useNavigate();
  
    const handleEndCall = () => {
      endCall(); // End the call
      navigate("/chat"); // Navigate back to chat
    };
  return (
    <CallScreen
    data={callData}
    endCall={handleEndCall} // Pass the custom end call function that handles navigation
  />
  );
}

export default VoiceCall;