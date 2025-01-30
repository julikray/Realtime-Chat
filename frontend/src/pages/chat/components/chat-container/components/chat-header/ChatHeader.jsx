// // import { Avatar, AvatarImage } from "@/components/ui/avatar";
// // import { getColor } from "@/lib/utils";
// // import { useAppStore } from "@/store";
// // import { HOST } from "@/utils/constants";
// // import React from "react";
// // import { IoVideocam } from "react-icons/io5";
// // import { MdCall } from "react-icons/md";
// // import { RiCloseFill } from "react-icons/ri";

// // function ChatHeader() {
// //   const {
// //     closeChat,
// //     selectedChatData,
// //     selectedChatType,
// //     startVoiceCall,
// //     startVideoCall,
// //   } = useAppStore();

// //   const handleVoiceCall = () => {
    
// //   };

// //   const handleVideoCall = () => {
    
// //   };
// //   return (
// //     <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-10 ">
// //       <div className="flex gap-5 items-center w-full justify-between ">
// //         <div className="flex gap-3 items-center justify-center">
// //           <div className="w-12 h-12 relative ">
// //             {selectedChatType === "contact" ? (
// //               <Avatar className="h-12 w-12 rounded-full overflow-hidden">
// //                 {selectedChatData.image ? (
// //                   <AvatarImage
// //                     src={`${HOST}/${selectedChatData.image}`}
// //                     alt="profile"
// //                     className="object-cover w-full h-full bg-black"
// //                   />
// //                 ) : (
// //                   <div
// //                     className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
// //                       selectedChatData.color
// //                     )} `}
// //                   >
// //                     {selectedChatData.firstName
// //                       ? selectedChatData.firstName.split("").shift()
// //                       : selectedChatData.email.split("").shift()}
// //                   </div>
// //                 )}
// //               </Avatar>
// //             ) : (
// //               <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#ffffff22]">
// //                 #
// //               </div>
// //             )}
// //           </div>
// //           <div>
// //             {selectedChatType === "channel" && selectedChatData.name}
// //             {selectedChatType === "contact" && selectedChatData.firstName
// //               ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
// //               : selectedChatData.email}
// //           </div>
// //         </div>

// //         <div className="flex items-center justify-center gap-5  ">

// //           <MdCall className="text-panel-header-icon cursor-pointer text-xl  " onClick={handleVoiceCall}  />
// //           <IoVideocam className="text-panel-header-icon cursor-pointer text-xl "  onClick={handleVideoCall} />
          
// //           <button
// //             className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all "
// //             onClick={closeChat}
// //           >
// //             <RiCloseFill className="text-3xl" />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ChatHeader;





// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { getColor } from "@/lib/utils";
// import { useAppStore } from "@/store";
// import { HOST } from "@/utils/constants";
// import React from "react";
// import { IoVideocam } from "react-icons/io5";
// import { MdCall } from "react-icons/md";
// import { RiCloseFill } from "react-icons/ri";

// function ChatHeader() {
//   const {
//     closeChat,
//     selectedChatData,
//     selectedChatType,
//     startVoiceCall,
//     startVideoCall,
//   } = useAppStore();

//   // const handleVoiceCall = () => {
//   //   if (selectedChatData) {
//   //     startVoiceCall({
//   //       type:"out-going",
//   //       callType:"voice",
//   //       recipient: selectedChatData,
//   //       roomId: Date.now(),
//   //     });
//   //   }
//   // };

//   // const handleVideoCall = () => {
//   //   if (selectedChatData) {
//   //     startVideoCall({
//   //       type:"out-going",
//   //       callType:"video",
//   //       recipient: selectedChatData,
//   //       roomId: Date.now(),
//   //     });
//   //   }
//   // };


//   const handleVoiceCall = () => {
//     // if (selectedChatData) {
//     //   console.log("Starting voice call with:", selectedChatData);
//     //   startVoiceCall({
//     //     type: "out-going",
//     //     callType: "voice",
//     //     recipient: selectedChatData,
//     //     roomId: Date.now(),
//     //   });
//     // }

//     dispatch({
//       type: reducerCases.SET_VOICE_CALL,
//       voiceCall :{
//         ...selectedChatType,
//         type: "out-going",
//         callType: "voice",
//         roomId : Date.now(),
//       },
    
//     });
//   };
  
//   const handleVideoCall = () => {
//     // if (selectedChatData) {
//     //   console.log("Starting video call with:", selectedChatData);
//     //   startVideoCall({
//     //     type: "out-going",
//     //     callType: "video",
//     //     recipient: selectedChatData,
//     //     roomId: Date.now(),
//     //   });
//     // }

//     dispatch({
//       type: reducerCases.SET,
//       voiceCall :{
//         ...selectedChatType,
//         type: "out-going",
//         callType: "voice",
//         roomId : Date.now(),
//       },
    
//     });
//   };

//   return (
//     <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-10">
//       <div className="flex gap-5 items-center w-full justify-between">
//         <div className="flex gap-3 items-center justify-center">
//           <div className="w-12 h-12 relative">
//             {selectedChatType === "contact" ? (
//               <Avatar className="h-12 w-12 rounded-full overflow-hidden">
//                 {selectedChatData?.image ? (
//                   <AvatarImage
//                     src={`${HOST}/${selectedChatData.image}`}
//                     alt="profile"
//                     className="object-cover w-full h-full bg-black"
//                   />
//                 ) : (
//                   <div
//                     className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
//                       selectedChatData?.color || ""
//                     )}`}
//                   >
//                     {selectedChatData?.firstName?.[0] ||
//                       selectedChatData?.email?.[0] ||
//                       "?"}
//                   </div>
//                 )}
//               </Avatar>
//             ) : (
//               <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#ffffff22]">
//                 #
//               </div>
//             )}
//           </div>
//           <div>
//             {selectedChatType === "channel"
//               ? selectedChatData?.name
//               : `${selectedChatData?.firstName || ""} ${
//                   selectedChatData?.lastName || ""
//                 }`}
//           </div>
//         </div>

//         <div className="flex items-center justify-center gap-5">
//           <MdCall
//             className="text-panel-header-icon cursor-pointer text-xl"
//             onClick={handleVoiceCall}
//           />
//           <IoVideocam
//             className="text-panel-header-icon cursor-pointer text-xl"
//             onClick={handleVideoCall}
//           />
//           <button
//             className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
//             onClick={closeChat}
//           >
//             <RiCloseFill className="text-3xl" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatHeader;



import React from "react";
import { useAppStore } from "@/store"; // Adjust the path based on your directory structure
import { IoVideocam } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { HOST } from "@/utils/constants";

function ChatHeader() {
  // Zustand store
  const {
    selectedChatType,
    selectedChatData,
    setVoiceCall,
    setVideoCall,
    closeChat,
  } = useAppStore();

  // Voice call handler
  const handleVoiceCall = () => {
    setVoiceCall({
      type: "out-going",
      callType: "voice",
      recipient: selectedChatData,
      roomId: Date.now(),
    });
    console.log("Voice call started:", selectedChatData);
  };

  // Video call handler
  const handleVideoCall = () => {
    setVideoCall({
      type: "out-going",
      callType: "video",
      recipient: selectedChatData,
      roomId: Date.now(),
    });
    console.log("Video call started:", selectedChatData);
  };

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-10">
      <div className="flex gap-5 items-center w-full justify-between">
        {/* Left Section: Avatar and Chat Info */}
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative">
            {selectedChatType === "contact" ? (
              <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {selectedChatData?.image ? (
                  <AvatarImage
                    src={`${HOST}/${selectedChatData.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                      selectedChatData?.color || ""
                    )}`}
                  >
                    {selectedChatData?.firstName?.[0] ||
                      selectedChatData?.email?.[0] ||
                      "?"}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#ffffff22]">
                #
              </div>
            )}
          </div>
          <div>
            {selectedChatType === "channel"
              ? selectedChatData?.name
              : `${selectedChatData?.firstName || ""} ${
                  selectedChatData?.lastName || ""
                }`}
          </div>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex items-center justify-center gap-5">
          <MdCall
            className="text-panel-header-icon cursor-pointer text-xl"
            onClick={handleVoiceCall}
          />
          <IoVideocam
            className="text-panel-header-icon cursor-pointer text-xl"
            onClick={handleVideoCall}
          />
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
