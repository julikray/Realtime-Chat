// // // // import { useAppStore } from "@/store";
// // // // import React, { useEffect } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { toast } from "sonner";
// // // // import ContactsContainer from "./components/contacts-container/ContactsContainer";
// // // // import EmptyChatContainer from "./components/empty-chat-container/EmptyChatContainer";
// // // // import ChatContainer from "./components/chat-container/ChatContainer";;
// // // // import VideoCall from "@/components/VideoCall";
// // // // import VoiceCall from "@/components/VoiceCall";

// // // // function Chat() {
// // // //   const { userInfo, selectedChatType, startVoiceCall, startVideoCall } =
// // // //     useAppStore();
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     if (!userInfo) {
// // // //       toast.error("Unauthorized access. Redirecting to login.");
// // // //       navigate("/auth");
// // // //       return;
// // // //     }

// // // //     if (!userInfo.profileSetup) {
// // // //       toast("Please setup your profile to continue.");
// // // //       navigate("/profile");
// // // //     }
// // // //   }, [userInfo, navigate]);

// // // //   return (
// // // //     <>
// // // //       {startVoiceCall && (
// // // //         <div className="h-screen w-screen max-h-full overflow-hidden">
// // // //           <VoiceCall />
// // // //         </div>
// // // //       )}
// // // //       {startVideoCall && (
// // // //         <div className="h-screen w-screen max-h-full overflow-hidden">
// // // //           <VideoCall />
// // // //         </div>
// // // //       )}

// // // //       {!startVoiceCall && !startVideoCall && (
// // // //         <div className="flex h-[100vh] text-white overflow-hidden ">
// // // //           <ContactsContainer />
// // // //           {selectedChatType === undefined ? (
// // // //             <EmptyChatContainer />
// // // //           ) : (
// // // //             <ChatContainer />
// // // //           )}
// // // //         </div>
// // // //       )}
// // // //     </>
// // // //   );
// // // // }

// // // // export default Chat;



// // // // // import { useAppStore } from "@/store";
// // // // // import React, { useEffect } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import { toast } from "sonner";
// // // // // import ContactsContainer from "./components/contacts-container/ContactsContainer";
// // // // // import EmptyChatContainer from "./components/empty-chat-container/EmptyChatContainer";
// // // // // import ChatContainer from "./components/chat-container/ChatContainer";
// // // // // import VideoCall from "@/components/VideoCall";
// // // // // import VoiceCall from "@/components/VoiceCall";

// // // // // function Chat() {
// // // // //   const { userInfo, selectedChatType, startVoiceCall, startVideoCall } = useAppStore();
// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     if (!userInfo) {
// // // // //       toast.error("Unauthorized access. Redirecting to login.");
// // // // //       navigate("/auth");
// // // // //       return;
// // // // //     }

// // // // //     if (!userInfo.profileSetup) {
// // // // //       toast("Please setup your profile to continue.");
// // // // //       navigate("/profile");
// // // // //     }
// // // // //   }, [userInfo, navigate]);

// // // // //   return (
// // // // //     <>
// // // // //       {/* Voice Call Component */}
// // // // //       {startVoiceCall && (
// // // // //         <div className="h-screen w-screen max-h-full overflow-hidden">
// // // // //           <VoiceCall />
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Video Call Component */}
// // // // //       {startVideoCall && (
// // // // //         <div className="h-screen w-screen max-h-full overflow-hidden">
// // // // //           <VideoCall />
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Main Chat Interface */}
// // // // //       {!startVoiceCall && !startVideoCall && (
// // // // //         <div className="flex h-[100vh] text-white overflow-hidden">
// // // // //           <ContactsContainer />
// // // // //           {selectedChatType === undefined ? (
// // // // //             <EmptyChatContainer />
// // // // //           ) : (
// // // // //             <ChatContainer />
// // // // //           )}
// // // // //         </div>
// // // // //       )
// // // // //       }
// // // // //     </>
// // // // //   );
// // // // // }

// // // // // export default Chat;





// // // import { useAppStore } from "@/store";
// // // import React, { useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { toast } from "sonner";
// // // import ContactsContainer from "./components/contacts-container/ContactsContainer";
// // // import EmptyChatContainer from "./components/empty-chat-container/EmptyChatContainer";
// // // import ChatContainer from "./components/chat-container/ChatContainer";
// // // import VideoCall from "@/components/VideoCall";
// // // import VoiceCall from "@/components/VoiceCall";

// // // function Chat() {
// // //   const { userInfo, selectedChatType, startVoiceCall, startVideoCall, endCall } =
// // //     useAppStore();
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     if (!userInfo) {
// // //       toast.error("Unauthorized access. Redirecting to login.");
// // //       navigate("/auth");
// // //       return;
// // //     }

// // //     if (!userInfo.profileSetup) {
// // //       toast("Please setup your profile to continue.");
// // //       navigate("/profile");
// // //     }
// // //   }, [userInfo, navigate]);

// // //   return (
// // //     <>
// // //       {startVoiceCall && (
// // //         <div className="h-screen w-screen max-h-full overflow-hidden">
// // //           <VoiceCall onEndCall={endCall} />
// // //         </div>
// // //       )}
// // //       {startVideoCall && (
// // //         <div className="h-screen w-screen max-h-full overflow-hidden">
// // //           <VideoCall onEndCall={endCall} />
// // //         </div>
// // //       )}

// // //       {!startVoiceCall && !startVideoCall && (
// // //         <div className="flex h-[100vh] text-white overflow-hidden">
// // //           <ContactsContainer />
// // //           {selectedChatType === undefined ? (
// // //             <EmptyChatContainer />
// // //           ) : (
// // //             <ChatContainer />
// // //           )}
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // }

// // // export default Chat;



// // import { useAppStore } from "@/store";
// // import React, { useEffect, useRef, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "sonner";
// // import ContactsContainer from "./components/contacts-container/ContactsContainer";
// // import EmptyChatContainer from "./components/empty-chat-container/EmptyChatContainer";
// // import ChatContainer from "./components/chat-container/ChatContainer";
// // import VideoCall from "@/components/VideoCall";
// // import VoiceCall from "@/components/VoiceCall";
// // import IncomingVoiceCall from "@/components/IncomingVoiceCall";
// // import IncomingVideoCall from "@/components/IncomingVideoCall";
// // import { io } from "socket.io-client";

// // function Chat() {
// //   const { userInfo, selectedChatType, voiceCall, videoCall, endCall , incomingVoiceCall ,incomingVideoCall  } =
// //     useAppStore();
  
// //   const socket = useRef(io("http://localhost:4000"));
// //   const navigate = useNavigate();

// //   const [ socketEvent , setSocketEvent ] = useState();

// //   useEffect(() => {
// //     console.log(userInfo)
// //     if (!userInfo) {
// //       toast.error("Unauthorized access. Redirecting to login.");
// //       navigate("/auth");
// //       return;
// //     }

// //     if (!userInfo.profileSetup) {
// //       toast("Please setup your profile to continue.");
// //       navigate("/profile");
// //     }
// //   }, [userInfo, navigate]);

  
// //   useEffect(() => {
// //     if (socket.current && !socketEvent ) {
// //       // Handle incoming voice call
// //       socket.current.on("incoming-voice-call", (data) => {
// //         setIncomingVoiceCall(data);
// //       });
  
// //       // Handle incoming video call
// //       socket.current.on("incoming-video-call", (data) => {
// //         setIncomingVideoCall(data);
// //       });
  
// //       // Handle call rejection
// //       socket.current.on("voice-call-rejected", () => {
// //         toast.info("Voice call was rejected.");
// //         endCall();
// //       });
  
// //       socket.current.on("video-call-rejected", () => {
// //         toast.info("Video call was rejected.");
// //         endCall();
// //       });

// //       setSocketEvent(true);


// //     }


// //   }, [socket.current]);
 

// //   return (
// //     <>

// //     {/* {incomingVideoCall && <IncomingVideoCall/> } */}
// //     {incomingVideoCall && (
// //       <>
// //         {console.log("Rendering IncomingVideoCall:", incomingVideoCall)}
// //         <IncomingVideoCall />
// //       </>
// //     )}
// //     {incomingVoiceCall && <IncomingVoiceCall/>}
// //       {/* Show voice call screen if startVoiceCall is true */}
// //       {voiceCall && (
// //         <div className="h-screen w-screen max-h-full overflow-hidden">
// //           <VoiceCall onEndCall={endCall} />
// //         </div>
// //       )}

// //       {/* Show video call screen if startVideoCall is true */}
// //       {videoCall && (
// //         <div className="h-screen w-screen max-h-full overflow-hidden">
// //           <VideoCall onEndCall={endCall} />
// //         </div>
// //       )}

// //       {/* Show chat interface if no call is active */}
// //       {!voiceCall && !videoCall && (
// //         <div className="flex h-[100vh] text-white overflow-hidden">
// //           <ContactsContainer />
// //           {selectedChatType === undefined ? (
// //             <EmptyChatContainer />
// //           ) : (
// //             <ChatContainer />
// //           )}
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // export default Chat;





// import { useAppStore } from "@/store";
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import ContactsContainer from "./components/contacts-container/ContactsContainer";
// import EmptyChatContainer from "./components/empty-chat-container/EmptyChatContainer";
// import ChatContainer from "./components/chat-container/ChatContainer";
// import VideoCall from "@/components/VideoCall";
// import VoiceCall from "@/components/VoiceCall";
// import IncomingVoiceCall from "@/components/IncomingVoiceCall";
// import IncomingVideoCall from "@/components/IncomingVideoCall";
// import { useSocket } from "@/context/SocketContext";

// function Chat() {
//   const {
//     userInfo,
//     selectedChatType,
//     voiceCall,
//     videoCall,
//     endCall,
//     setIncomingVoiceCall,
//     setIncomingVideoCall,
//     incomingVoiceCall,
//     incomingVideoCall,
//   } = useAppStore();

//   const socket = useSocket();
//   const navigate = useNavigate();
//   const [socketInitialized, setSocketInitialized] = useState(false);

//   useEffect(() => {
//     if (!userInfo) {
//       toast.error("Unauthorized access. Redirecting to login.");
//       navigate("/auth");
//       return;
//     }

//     if (!userInfo.profileSetup) {
//       toast("Please setup your profile to continue.");
//       navigate("/profile");
//     }
//   }, [userInfo, navigate]);

//   // useEffect(() => {

   

//   //   if (socket && socket.current && !socketInitialized) {
//   //     socket.current.on("incoming-voice-call", ({from , roomId ,callType}) => {
//   //       setIncomingVoiceCall({from ,roomId, callType});
//   //       console.log("incoming-voice" , setIncomingVoiceCall)
//   //     });

//   //     socket.current.on("incoming-video-call", ({from , roomId ,callType}) => {
//   //       setIncomingVideoCall({from , roomId ,callType});
//   //     });

//   //     socket.current.on("voice-call-rejected", () => {
//   //       toast.info("Voice call was rejected.");
//   //       endCall();
//   //     });

//   //     socket.current.on("video-call-rejected", () => {
//   //       toast.info("Video call was rejected.");
//   //       endCall();
//   //     });

//   //     setSocketInitialized(true);
//   //   }
//   // }, [socketInitialized, setIncomingVoiceCall, setIncomingVideoCall, endCall]);

//   useEffect(() => {
//     if (socket && socket.current) {
//       console.log("✅ Socket is connected with ID:", socket.current.id);
//     } else {
//       console.log("❌ Socket is NOT connected!");
//     }
//   }, [socket]);
  
  
//   return (
//     <>
//       {incomingVoiceCall && <IncomingVoiceCall />}
//       {incomingVideoCall && <IncomingVideoCall />}

//       {voiceCall && (
//         <div className="h-screen w-screen max-h-full overflow-hidden">
//           <VoiceCall  />
//         </div>
//       )}

//       {videoCall && (
//         <div className="h-screen w-screen max-h-full overflow-hidden">
//           <VideoCall />
//         </div>
//       )}

//       {!voiceCall && !videoCall && (
//         <div className="flex h-[100vh] text-white overflow-hidden">
//           <ContactsContainer />
//           {selectedChatType === undefined ? (
//             <EmptyChatContainer />
//           ) : (
//             <ChatContainer />
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default Chat;




import { useAppStore } from "@/store";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./components/contacts-container/ContactsContainer";
import EmptyChatContainer from "./components/empty-chat-container/EmptyChatContainer";
import ChatContainer from "./components/chat-container/ChatContainer";
import VideoCall from "@/components/VideoCall";
import VoiceCall from "@/components/VoiceCall";
import IncomingVoiceCall from "@/components/IncomingVoiceCall";
import IncomingVideoCall from "@/components/IncomingVideoCall";
import { useSocket } from "@/context/SocketContext";

function Chat() {
  const {
    userInfo,
    selectedChatType,
    voiceCall,
    videoCall,
    endCall,
    setIncomingVoiceCall,
    setIncomingVideoCall,
    incomingVoiceCall,
    incomingVideoCall,
  } = useAppStore();

  const socket = useSocket();
  const navigate = useNavigate();
  const [socketInitialized, setSocketInitialized] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      toast.error("Unauthorized access. Redirecting to login.");
      navigate("/auth");
      return;
    }

    if (!userInfo.profileSetup) {
      toast("Please setup your profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (socket && !socketInitialized) {
      socket.on("incoming-voice-call", ({ from, roomId, callType }) => {
        setIncomingVoiceCall({ from, roomId, callType });
        console.log("incoming-voice", from);
      });

      socket.on("incoming-video-call", ({ from, roomId, callType }) => {
        setIncomingVideoCall({ from, roomId, callType });
      });

      socket.on("voice-call-rejected", () => {
        toast.info("Voice call was rejected.");
        endCall();
      });

      socket.on("video-call-rejected", () => {
        toast.info("Video call was rejected.");
        endCall();
      });

      setSocketInitialized(true);
    }
  }, [socket, socketInitialized, setIncomingVoiceCall, setIncomingVideoCall, endCall]);

  return (
    <>
      {incomingVoiceCall && <IncomingVoiceCall />}
      {incomingVideoCall && <IncomingVideoCall />}

      {voiceCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VoiceCall />
        </div>
      )}

      {videoCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VideoCall />
        </div>
      )}

      {!voiceCall && !videoCall && (
        <div className="flex h-[100vh] text-white overflow-hidden">
          <ContactsContainer />
          {selectedChatType === undefined ? (
            <EmptyChatContainer />
          ) : (
            <ChatContainer />
          )}
        </div>
      )}
    </>
  );
}

export default Chat;
