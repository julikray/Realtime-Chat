import React, { useState } from "react";
import { useAppStore } from "@/store";
import { useSocket } from "@/context/SocketContext";
import { data } from "autoprefixer";
import { MdOutlineCallEnd } from "react-icons/md";

function CallScreen() {
  
   const { callData, endCall , startVideoCall } = useAppStore();
  
 

   const [callAccepted , setCallAccepted] = useState(false);

  

  return (
    <div className="w-full border-1 flex flex-col h-[100vh] overflow-hidden items-center justify-ce ">
      <div className="flex flex-col gap-3 items-center " >
       <span className="text-5xl " >{ data.name} </span>
       <span>
        {
          callAccepted && data.callType !== "video" ? "On going call " : "Calling"

        }
       </span>
      </div>
      {( !callAccepted || data.callType === "audio") && (<div className="my-24" >
        <img
        src={data.profilePicture}
        alt="avtart"
        height={300}
        width={300}
        className="rounded-full"
        

        />
      </div> ) }

      <div className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full " >
        <MdOutlineCallEnd className="text-3xl cursor-pointer " onClick={endCall} />
      </div>
    
    </div>
  );
}

export default CallScreen;



// import { useAppStore } from "@/store";
// import React, { useState } from "react";
// import { MdOutlineCallEnd } from "react-icons/md";

// function CallScreen({ data }) {
//   const {  endCall } = useAppStore();
//   const [callAccepted, setCallAccepted] = useState(false);

//   return (
//     <div className="w-full border flex flex-col h-[100vh] overflow-hidden items-center justify-center">
//       {/* Call Information */}
//       <div className="flex flex-col gap-3 items-center">
//         <span className="text-5xl">{data?.name || "Unknown Caller"}</span>
//         <span>
//           {callAccepted && data.callType !== "video" ? "On-going call" : "Calling..."}
//         </span>
//       </div>

//       {/* Avatar */}
//       {(!callAccepted || data.callType === "audio") && (
//         <div className="my-24">
//           <img
//             src={data?.profilePicture || "/default-avatar.png"}
//             alt="avatar"
//             height={300}
//             width={300}
//             className="rounded-full"
//           />
//         </div>
//       )}

//       {/* End Call Button */}
//       <div className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full">
//         <MdOutlineCallEnd
//           className="text-3xl cursor-pointer text-white"
//           onClick={endCall}
//         />
//       </div>
//     </div>
//   );
// }

// export default CallScreen;
