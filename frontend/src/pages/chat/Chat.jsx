import { useAppStore } from "@/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./components/contacts-container/ContactsContainer";
import EmptyChatContainer from "./components/empty-chat-container/EmptyChatContainer";
import ChatContainer from "./components/chat-container/ChatContainer";;


function Chat() {
  const { userInfo, selectedChatType } =
    useAppStore();
  const navigate = useNavigate();

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

  return (
   
        <div className="flex h-[100vh] text-white overflow-hidden ">
          <ContactsContainer />
          {selectedChatType === undefined ? (
            <EmptyChatContainer />
          ) : (
            <ChatContainer />
          )}
        </div>
     
  );
}

export default Chat;



// import { useAppStore } from "@/store";
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import ContactsContainer from "./components/contacts-container/ContactsContainer";
// import EmptyChatContainer from "./components/empty-chat-container/EmptyChatContainer";
// import ChatContainer from "./components/chat-container/ChatContainer";
// import VideoCall from "@/components/VideoCall";
// import VoiceCall from "@/components/VoiceCall";

// function Chat() {
//   const { userInfo, selectedChatType, startVoiceCall, startVideoCall } = useAppStore();
//   const navigate = useNavigate();

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

//   return (
//     <>
//       {/* Voice Call Component */}
//       {startVoiceCall && (
//         <div className="h-screen w-screen max-h-full overflow-hidden">
//           <VoiceCall />
//         </div>
//       )}

//       {/* Video Call Component */}
//       {startVideoCall && (
//         <div className="h-screen w-screen max-h-full overflow-hidden">
//           <VideoCall />
//         </div>
//       )}

//       {/* Main Chat Interface */}
//       {!startVoiceCall && !startVideoCall && (
//         <div className="flex h-[100vh] text-white overflow-hidden">
//           <ContactsContainer />
//           {selectedChatType === undefined ? (
//             <EmptyChatContainer />
//           ) : (
//             <ChatContainer />
//           )}
//         </div>
//       )
//       }
//     </>
//   );
// }

// export default Chat;
