// // import React, { useEffect, useState } from "react";
// // import { useAppStore } from "@/store";
// // import { MdOutlineCallEnd } from "react-icons/md";
// // import { Avatar } from "@radix-ui/react-avatar";
// // import { useSocket } from "@/context/SocketContext";
// // import { AvatarImage } from "./ui/avatar";
// // import { HOST } from "@/utils/constants";
// // import { getColor } from "@/lib/utils";

// // function CallScreen({ data }) {
// //   const { callData, endCall, selectedChatType, selectedChatData, userInfo } =
// //     useAppStore();
// //   const socket = useSocket();

// //   const [callAccepted, setCallAccepted] = useState(false);

// //   useEffect(() => {
// //     console.log("CallScreen Data:", data); // Debug data structure
// //   }, [data]);

// //   // const endcall = () => {
// //   //   const id = data.id;
// //   //   if (data.callType === "voice") {
// //   //     socket.emit("reject-voice-call", {
// //   //       from: id,
// //   //     });
// //   //   } else {
// //   //     socket.emit("reject-video-call", {
// //   //       from: id,
// //   //     });
// //   //   }

// //   //   endCall();
// //   // };

// //   const endcall = () => {
// //     if (!data || !data.recipient._id) {
// //       console.error("Call data is missing:", data);
// //       return;
// //     }

// //     const id = data.recipient._id;
// //     if (data.callType === "voice") {
// //       socket.emit("reject-voice-call", { from: id });
// //     } else {
// //       socket.emit("reject-video-call", { from: id });
// //     }

// //     endCall();
// //   };

// //   return (
// //     <div className="w-full border-1 flex flex-col h-[100vh] overflow-hidden items-center justify-center bg-[#1c1d25] ">
// //       <div className="flex flex-col gap-3 items-center ">
// //         <span className="text-5xl text-white ">
// //           {
// //             `${data.recipient.firstName} ${data.recipient.lastName}`}{" "}
// //         </span>
// //         <span className="text-lg text-gray-500">
// //           {callAccepted && data.callType !== "video"
// //             ? "On going call "
// //             : "Calling"}
// //         </span>
// //       </div>
// //       {(!callAccepted || data.callType === "audio") && (
// //         <div className="my-24">

// //           <Avatar className="h-32 w-32 rounded-full overflow-hidden">
// //             {data.image ? (
// //               <AvatarImage
// //                 src={`${HOST}/${data.image}`}
// //                 alt="profile"
// //                 className="object-cover w-full h-full bg-black"
// //               />
// //             ) : (
// //               <div
// //                 className={`uppercase h-32 w-32 text-6xl font-bold   border-[1px] flex items-center justify-center rounded-full ${getColor(
// //                   data.color
// //                 )} `}
// //               >
// //                 {data.firstName
// //                   ? data.firstName.split("").shift()
// //                   : data.email.split("").shift()}
// //               </div>
// //             )}
// //           </Avatar>
// //         </div>
// //       )}

// //       <div className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full ">
// //         <MdOutlineCallEnd
// //           className="text-3xl cursor-pointer "
// //           onClick={endcall}
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // export default CallScreen;

// import React, { useEffect, useState } from "react";
// import { useAppStore } from "@/store";
// import { MdOutlineCallEnd } from "react-icons/md";
// import { Avatar } from "@radix-ui/react-avatar";
// import { useSocket } from "@/context/SocketContext";
// import { AvatarImage } from "./ui/avatar";
// import { GET_CALL_TOKEN, HOST } from "@/utils/constants";
// import { getColor } from "@/lib/utils";
// import axios from "axios";
// import { ZegoExpressEngine } from "zego-express-engine-webrtc";

// function CallScreen({ data }) {
//   const { callData, endCall, selectedChatType, selectedChatData, userInfo } =
//     useAppStore();
//   const socket = useSocket();
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [token, setToken] = useState(undefined);
//   const [zgVar, setZgVar] = useState(undefined);
//   const [localStream, setLocalStream] = useState(undefined);
//   const [publishStream, setPublishStream] = useState(undefined);

//   useEffect(() => {
//     console.log("CallScreen Data:", data);
//     if (data.type === "out-going")
//       socket.on("accept-call", () => setCallAccepted(true));
//     else {
//       setTimeout(() => {
//         setCallAccepted(true);
//       }, 1000);
//     }
//   }, [data]);

//   useEffect(() => {
//     const getTokem = async () => {
//       try {
//         const {
//           data: { token },
//         } = await axios.get(`${GET_CALL_TOKEN}/${userInfo.id}`);
//         setToken(returnedToken);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//   }, [callAccepted]);

//   useEffect(() => {
//     const startCall = async () => {
//       import("zego-express-engine-webrtc").then(
//         async ({ ZegoExpressEngine }) => {
//           const zg = new ZegoExpressEngine(
//             import.meta.env.VITE_ZEGO_APP_ID,
//             import.meta.env.VITE_ZEGO_SERVER_SECRET
//           );
//           setZgVar(zg);

//           zg.on(
//             "roomStreamUpdate",
//             async (roomID, updateType, streamList, extendedData) => {
//               if (updateType === "ADD") {
//                 const rmVideo = document.getElementById("remote-video");
//                 const vd = document.createElement(
//                   data.callType === "video" ? "video" : "audio"
//                 );

//                 vd.id = streamList[0].streamID;
//                 vd.autoplay = true;
//                 vd.playsInline = true;
//                 vd.muted = false;
//                 if (rmVideo) {
//                   rmVideo.appendChild(vd);
//                 }
//                 zg.startPlayingStream(streamList[0].streamID, {
//                   audio: true,
//                   video: true,
//                 }).then((stream) => (vd.srcObject = stream));
//               } else if (
//                 updateType === "DELETE" &&
//                 zg &&
//                 localStream &&
//                 streamList[0].streamID
//               ) {
//                 zg.destroyStream(localStream);
//                 zg.stopPublishingStream(streamList[0].streamID);
//                 zg.logoutRoom(data.roomID.toString());
//                 endCall();
//               }
//             }
//           );

//           await zg.loginRoom(
//             data.roomID.toString(),
//             token,
//             { userID: userInfo.id.toString(), userName: userInfo.name },
//             { userUpdate: true }
//           );

//           const localStream = await zg.createStream({
//             camera: {
//               audio: true,
//               video: data.callType === " video" ? true : false,
//             },
//           });

//           const localVideo = document.getElementById("local-audio");
//           const videoElement = document.createElement(
//             data.callType === "video" ? "video" : "audio"
//           );
//           videoElement.id = "video-local-zego";
//           videoElement.className = "h-28 w-32";
//           videoElement.autoplay = true;
//           videoElement.muted = false;

//           videoElement.playsInline = true;

//           localVideo.appendChild(videoElement);
//           const id = document.getElementById("video-local-zego");
//           td.srcObject = localStream;
//           const streamID = "123" + Date.now();
//           setPublishStream(streamID);
//           setLocalStream(localStream);
//           zg.startPublishingStream(streamID, localStream);
//         }
//       );
//     };
//     if (token) {
//       startCall();
//     }
//   }, [token]);

//   const endcall = () => {
//     if (!data || !data.recipient || !data.recipient._id) {
//       console.error("Call data is missing or undefined:", data);
//       return;
//     }

//     const id = data.recipient._id;

//     if (zgVar && localStream && publishStream) {
//       zgVar.destroyStream(localStream);
//       zgVar.stopPublishingStream(publishStream);
//       zgVar.logoutRoom(data.roomID.toString());
//     }

//     if (data.callType === "voice") {
//       socket.emit("reject-voice-call", { from: id });
//     } else {
//       socket.emit("reject-video-call", { from: id });
//     }

//     endCall();
//   };

//   return (
//     <div className="w-full border-1 flex flex-col h-[100vh] overflow-hidden items-center justify-center bg-[#1c1d25]">
//       <div className="flex flex-col gap-3 items-center">
//         <span className="text-5xl text-white">
//           {data?.recipient?.firstName || "Unknown"}{" "}
//           {data?.recipient?.lastName || ""}
//         </span>
//         <span className="text-lg text-gray-500">
//           {callAccepted && data?.callType !== "video"
//             ? "On going call"
//             : "Calling..."}
//         </span>
//       </div>

//       {(!callAccepted || data?.callType === "audio") && (
//         <div className="my-24">
//           <Avatar className="h-32 w-32 rounded-full overflow-hidden">
//             {data?.image ? (
//               <AvatarImage
//                 src={`${HOST}/${data.image}`}
//                 alt="profile"
//                 className="object-cover w-full h-full bg-black"
//               />
//             ) : (
//               <div
//                 className={`uppercase h-32 w-32 text-6xl font-bold border-[1px] flex items-center justify-center rounded-full ${getColor(
//                   data?.recipient?.color || "gray"
//                 )}`}
//               >
//                 {data?.recipient?.firstName
//                   ? data?.recipient?.firstName.charAt(0).toUpperCase()
//                   : "?"}
//               </div>
//             )}
//           </Avatar>
//         </div>
//       )}

//       <div className="my-5 relative " id="remote-video">
//         <div className="absolute bottom-5 right-5 " id="local-audio"></div>
//       </div>

//       <button
//         onClick={endcall}
//         className="mt-8 p-4 bg-red-600 text-white text-lg rounded-full flex items-center justify-center"
//       >
//         <MdOutlineCallEnd size={32} />
//       </button>
//     </div>
//   );
// }

// export default CallScreen;














// import React, { useEffect, useState } from "react";
// import { useAppStore } from "@/store";
// import { MdOutlineCallEnd } from "react-icons/md";
// import { Avatar } from "@radix-ui/react-avatar";
// import { useSocket } from "@/context/SocketContext";
// import { AvatarImage } from "./ui/avatar";
// import { GET_CALL_TOKEN, HOST } from "@/utils/constants";
// import { getColor } from "@/lib/utils";
// import axios from "axios";
// import { ZegoExpressEngine } from "zego-express-engine-webrtc";

// function CallScreen({ data }) {
//   const { endCall, userInfo } = useAppStore();
//   const socket = useSocket();
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [token, setToken] = useState(null);
//   const [zgVar, setZgVar] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [publishStream, setPublishStream] = useState(null);

//   useEffect(() => {
//     console.log("CallScreen Data:", data);

//     if (data.type === "out-going") {
//       socket.on("accept-call", () => {
//         console.log("Call Accepted!");
//         setCallAccepted(true);
//       });
//     } else {
//       setTimeout(() => {
//         console.log("Auto Accepting Incoming Call...");
//         setCallAccepted(true);
//       }, 1000);
//     }
//   }, [data]);

//   useEffect(() => {
//     const getToken = async () => {
//       try {

//         const {
//           data : { token : returnedToken },
//         } = await axios.get(`${GET_CALL_TOKEN}/${userInfo.id}`);
//         console.log(token)
//         setToken(returnedToken);

//         // console.log("Fetching Call Token...");
//         // const response = await axios.get(`${GET_CALL_TOKEN}/${userInfo.id}`);
//         // console.log("GET_CALL_TOKEN" , `${GET_CALL_TOKEN}/${userInfo.id}`);
//         // console.log("Token Fetched:", response.data.token);
//         // setToken(response.data.token);
//       } catch (error) {
//         console.error("Error fetching token:", error);
//       }
//     };

//     // if (callAccepted) {
//     //   getToken();
//     // }
//   }, [callAccepted]);

//   useEffect(() => {
//     const startCall = async () => {
//       try {
//         console.log("Initializing Zego Engine...");
//         const zg = new ZegoExpressEngine(
//           import.meta.env.VITE_ZEGO_APP_ID,
//           import.meta.env.VITE_ZEGO_SERVER_SECRET,
//         );
//         setZgVar(zg);

//         zg.on("roomStreamUpdate", async (roomID, updateType, streamList) => {
//           console.log("Room Stream Update:", updateType, streamList);
//           if (updateType === "ADD" && streamList.length > 0) {
//             console.log("Playing Remote Stream...");
//             const remoteContainer = document.getElementById("remote-video");
//             if (remoteContainer) {
//               const videoElement = document.createElement(
//                 data.callType === "video" ? "video" : "audio"
//               );
//               videoElement.id = streamList[0].streamID;
//               videoElement.autoplay = true;
//               videoElement.playsInline = true;
//               remoteContainer.appendChild(videoElement);

//               const stream = await zg.startPlayingStream(streamList[0].streamID);
//               videoElement.srcObject = stream;
//               console.log("Remote Stream Played Successfully");
//             }
//           } else if (updateType === "DELETE") {
//             console.log("Remote Stream Removed. Ending Call...");
//             zg.destroyStream(localStream);
//             zg.stopPublishingStream(streamList[0].streamID);
//             zg.logoutRoom(data.roomId.toString());
//             endCall();
//           }
//         });

//         console.log("Logging into Zego Room:", data.roomId);
//         await zg.loginRoom(
//           data.roomId.toString(),
//           token,
//           { userID: userInfo.id.toString(), userName: userInfo.name },
//           { userUpdate: true }
//         );

//         console.log("Creating Local Stream...");
//         const localStream = await zg.createStream({
//           camera: {
//             audio: true,
//             video: data.callType === "video",
//           },
//         });

//         console.log("Displaying Local Stream...");
//         const localContainer = document.getElementById("local-video");
//         if (localContainer) {
//           const videoElement = document.createElement("video");
//           videoElement.id = "video-local-zego";
//           videoElement.className = "h-28 w-32";
//           videoElement.autoplay = true;
//           videoElement.muted = true;
//           videoElement.playsInline = true;
//           localContainer.appendChild(videoElement);
//           videoElement.srcObject = localStream;
//         }

//         const streamID = "123" + Date.now();
//         setPublishStream(streamID);
//         setLocalStream(localStream);
//         console.log("Publishing Local Stream...");
//         await zg.startPublishingStream(streamID, localStream);
//         console.log("Call Started Successfully!");
//       } catch (error) {
//         console.error("Error starting call:", error);
//       }
//     };

//     if (token) {
//       startCall();
//     }
//   }, [token]);

//   const endcall = () => {
//     console.log("Ending Call...");
//     if (!data?.recipient?._id && !data?.from?.id) {
//       console.error("Call data is missing:", data);
//       return;
//     }

//     const id = data.recipient?._id || data.from?.id;
//     if (zgVar && localStream && publishStream) {
//       zgVar.destroyStream(localStream);
//       zgVar.stopPublishingStream(publishStream);
//       zgVar.logoutRoom(data.roomId.toString());
//     }

//     socket.emit(
//       data.callType === "voice" ? "reject-voice-call" : "reject-video-call",
//       { from: id }
//     );

//     endCall();
//   };

//   return (
//     <div className="w-full flex flex-col h-[100vh] items-center justify-center bg-[#1c1d25]">
//       <div className="flex flex-col gap-3 items-center">
//         <span className="text-5xl text-white">
//           {data?.recipient?.firstName || data?.from?.firstName || "Unknown"}{" "}
//           {data?.recipient?.lastName || data?.from?.lastName || ""}
//         </span>
//         <span className="text-lg text-gray-500">
//           {callAccepted && data?.callType !== "video" ? "On-going call" : "Calling..."}
//         </span>
//       </div>

//       {(!callAccepted || data?.callType === "audio") && (
//         <div className="my-24">
//           <Avatar className="h-32 w-32 rounded-full overflow-hidden">
//             <AvatarImage
//               src={`${HOST}/${data?.recipient?.image || data?.from?.image}`}
//               alt="profile"
//               className="object-cover w-full h-full bg-black"
//             />
//           </Avatar>
//         </div>
//       )}

//       <div className="my-5 relative" id="remote-video">
//         <div className="absolute bottom-5 right-5" id="local-video"></div>
//       </div>

//       <button
//         onClick={endcall}
//         className="mt-8 p-4 bg-red-600 text-white text-lg rounded-full flex items-center justify-center"
//       >
//         <MdOutlineCallEnd size={32} />
//       </button>
//     </div>
//   );
// }

// export default CallScreen;










import React, { useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { MdOutlineCallEnd } from "react-icons/md";
import { Avatar } from "@radix-ui/react-avatar";
import { useSocket } from "@/context/SocketContext";
import { AvatarImage } from "./ui/avatar";
import { GET_CALL_TOKEN, HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import axios from "axios";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";

function CallScreen({ data }) {
  const { endCall, userInfo } = useAppStore();
  const socket = useSocket();
  const [callAccepted, setCallAccepted] = useState(false);
  const [token, setToken] = useState(null);
  const [zgVar, setZgVar] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [publishStream, setPublishStream] = useState(null);

  // Debugging logs for each step
  console.log("CallScreen Data:", data);

  useEffect(() => {
    if (data.type === "out-going") {
      socket.on("accept-call", () => {
        console.log("Call Accepted!");
        setCallAccepted(true);
      });
    } else {
      setTimeout(() => {
        console.log("Auto Accepting Incoming Call...");
        setCallAccepted(true);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    const getToken = async () => {
      try {
        console.log("Fetching call token...");
        const { data :{token : returnedToken}, } = await axios.get(`${GET_CALL_TOKEN}/${userInfo.id}`);
        // console.log("API Response:", response);  // Log the entire response
        // const returnedToken = response.data?.token;  // Ensure the token is being extracted correctly
        // console.log("Fetched Token:", returnedToken);
        setToken(returnedToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    
   
      getToken();
    
  }, [callAccepted]);

  useEffect(() => {
    const startCall = async () => {
      try {
        console.log("Initializing Zego Engine...");
        const zg = new ZegoExpressEngine(
          import.meta.env.VITE_ZEGO_APP_ID,
          import.meta.env.VITE_ZEGO_SERVER_SECRET
        );
        setZgVar(zg);

        // Room Stream Update Listener
        zg.on("roomStreamUpdate", async (roomId, updateType, streamList) => {
          console.log("Room Stream Update:", updateType, streamList);
          if (updateType === "ADD" && streamList.length > 0) {
            console.log("Playing Remote Stream...");
            const remoteContainer = document.getElementById("remote-video");
            if (remoteContainer) {
              const videoElement = document.createElement(
                data.callType === "video" ? "video" : "audio"
              );
              videoElement.id = streamList[0].streamID;
              videoElement.autoplay = true;
              videoElement.playsInline = true;
              remoteContainer.appendChild(videoElement);

              const stream = await zg.startPlayingStream(streamList[0].streamID);
              videoElement.srcObject = stream;
              console.log("Remote Stream Played Successfully");
            }
          } else if (updateType === "DELETE") {
            console.log("Remote Stream Removed. Ending Call...");
            zg.destroyStream(localStream);
            zg.stopPublishingStream(streamList[0].streamID);
            zg.logoutRoom(data.roomId.toString());
            endCall();
          }
        });

        console.log("Logging into Zego Room:", data.roomId);
        await zg.loginRoom(
          data.roomId.toString(),
          token,
          { userID: userInfo.id.toString(), userName: userInfo.name },
          { userUpdate: true }
        );

        console.log("Creating Local Stream...");
        const localStream = await zg.createStream({
          camera: {
            audio: true,
            video: data.callType === "video",
          },
        });

        console.log("Displaying Local Stream...");
        const localContainer = document.getElementById("local-video");
        if (localContainer) {
          const videoElement = document.createElement("video");
          videoElement.id = "video-local-zego";
          videoElement.className = "h-28 w-32";
          videoElement.autoplay = true;
          videoElement.muted = true;
          videoElement.playsInline = true;
          localContainer.appendChild(videoElement);
          videoElement.srcObject = localStream;
        }

        const streamID = "123" + Date.now();
        setPublishStream(streamID);
        setLocalStream(localStream);
        console.log("Publishing Local Stream...");
        await zg.startPublishingStream(streamID, localStream);
        console.log("Call Started Successfully!");
      } catch (error) {
        console.error("Error starting call:", error);
      }
    };

    if (token) {
      console.log("Token is set, starting call...");
      startCall();
    }
  }, [token]);

  const endcall = () => {
    console.log("Ending Call...");
    if (!data?.recipient?._id && !data?.from?.id) {
      console.error("Call data is missing:", data);
      return;
    }

    const id = data.recipient?._id || data.from?.id;
    if (zgVar && localStream && publishStream) {
      console.log("Destroying stream and logging out...");
      zgVar.destroyStream(localStream);
      zgVar.stopPublishingStream(publishStream);
      zgVar.logoutRoom(data.roomId.toString());
    }

    socket.emit(
      data.callType === "voice" ? "reject-voice-call" : "reject-video-call",
      { from: id }
    );

    endCall();
  };

  return (
    <div className="w-full flex flex-col h-[100vh] items-center justify-center bg-[#1c1d25]">
      <div className="flex flex-col gap-3 items-center">
        <span className="text-5xl text-white">
          {data?.recipient?.firstName || data?.from?.firstName || "Unknown"}{" "}
          {data?.recipient?.lastName || data?.from?.lastName || ""}
        </span>
        <span className="text-lg text-gray-500">
          {callAccepted && data?.callType !== "video" ? "On-going call" : "Calling..."}
        </span>
      </div>

      {(!callAccepted || data?.callType === "audio") && (
        <div className="my-24">
          <Avatar className="h-32 w-32 rounded-full overflow-hidden">
            <AvatarImage
              src={`${HOST}/${data?.recipient?.image || data?.from?.image}`}
              alt="profile"
              className="object-cover w-full h-full bg-black"
            />
          </Avatar>
        </div>
      )}

      <div className="my-5 relative" id="remote-video">
        <div className="absolute bottom-5 right-5" id="local-video"></div>
      </div>

      <button
        onClick={endcall}
        className="mt-8 p-4 bg-red-600 text-white text-lg rounded-full flex items-center justify-center"
      >
        <MdOutlineCallEnd size={32} />
      </button>
    </div>
  );
}

export default CallScreen;
