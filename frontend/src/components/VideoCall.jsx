// // import React from "react";
// // import { useAppStore } from "@/store";

// // function VideoCall() {
// //   const { callData, endCall } = useAppStore();

// //   if (!callData) return null;

// //   return (
// //     <div className="video-call">
// //       <h1>Video Call with {callData.recipientName}</h1>
// //       <button onClick={endCall}>End Call</button>
// //     </div>
// //   );
// // }

// // export default VideoCall;


// import React from "react";
// import { useAppStore } from "@/store";
// import CallScreen from "./CallScreen";


// function VideoCall() {

//   const { callData, endCall , socket , startVideoCall } = useAppStore();

//   return (
//     <CallScreen data={startVideoCall} />
//   );
// }

// export default VideoCall;


// import React from "react";
// import { useAppStore } from "@/store";
// import CallScreen from "./CallScreen";

// function VideoCall() {
//   const { callData, endCall } = useAppStore();

//   return (
//     <CallScreen
//       data={callData} // Pass call data for rendering
//       endCall={endCall} // Pass end call function
//     />
//   );
// }

// export default VideoCall;

import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import CallScreen from "./CallScreen";

function VideoCall() {
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

export default VideoCall;

