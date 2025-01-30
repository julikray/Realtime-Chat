import React, { useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { MdOutlineCallEnd } from "react-icons/md";
import { Avatar } from "@radix-ui/react-avatar";
import { useSocket } from "@/context/SocketContext";
import { AvatarImage } from "./ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";

function CallScreen({ data }) {
  const { callData, endCall, selectedChatType, selectedChatData, userInfo } =
    useAppStore();
  const socket = useSocket();

  const [callAccepted, setCallAccepted] = useState(false);

  useEffect(() => {
    console.log("CallScreen Data:", data); // Debug data structure
  }, [data]);

  const endcall = () => {
    const id = data.id;
    if (data.callType === "voice") {
      socket.emit("reject-voice-call", {
        from: id,
      });
    } else {
      socket.emit("reject-video-call", {
        from: id,
      });
    }

    endCall();
  };

  return (
    <div className="w-full border-1 flex flex-col h-[100vh] overflow-hidden items-center justify-center  ">
      <div className="flex flex-col gap-3 items-center ">
        <span className="text-5xl ">
          {selectedChatData.name ||
            `${data.recipient.firstName} ${data.recipient.lastName}`}{" "}
        </span>
        <span className="text-lg">
          {callAccepted && selectedChatData.callType !== "video"
            ? "On going call "
            : "Calling"}
        </span>
      </div>
      {(!callAccepted || selectedChatData.callType === "audio") && (
        <div className="my-24">
          {/* <Avatar
        src={selectedChatData.image}
        alt="avtart"
        height={300}
        width={300}
        className="rounded-full"
        

        /> */}

          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {selectedChatData.image ? (
              <AvatarImage
                src={`${HOST}/${selectedChatData.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  selectedChatData.color
                )} `}
              >
                {selectedChatData.firstName
                  ? selectedChatData.firstName.split("").shift()
                  : selectedChatData.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
      )}

      <div className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full ">
        <MdOutlineCallEnd
          className="text-3xl cursor-pointer "
          onClick={endcall}
        />
      </div>
    </div>
  );
}

export default CallScreen;
