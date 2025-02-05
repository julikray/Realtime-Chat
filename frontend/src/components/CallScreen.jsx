import React, { useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { MdOutlineCallEnd } from "react-icons/md";
import { Avatar } from "@radix-ui/react-avatar";
import { useSocket } from "@/context/SocketContext";
import { AvatarImage } from "./ui/avatar";
import { GET_CALL_TOKEN, HOST } from "@/utils/constants";
import axios from "axios";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { getColor } from "@/lib/utils";

function CallScreen({ data, userId }) {
  const { endCall, userInfo } = useAppStore();
  const socket = useSocket();
  const [callAccepted, setCallAccepted] = useState(false);
  const [token, setToken] = useState(null);
  const [zegoEngine, setZegoEngine] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [publishStream, setPublishStream] = useState(null);

  const user = data?.recipient || data?.from;

  useEffect(() => {
    // console.log("CallScreen Data:", data);

    if (data.type === "out-going") {
      socket.on("accept-call", () => {
        // console.log("Call Accepted!");
        setCallAccepted(true);
      });
    } else {
      setTimeout(() => {
        // console.log("Auto Accepting Incoming Call...");
        setCallAccepted(true);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const apiUrl = GET_CALL_TOKEN(userInfo.id);
        // console.log("🔹 Fetching token from:", apiUrl);

        const response = await axios.get(apiUrl, { withCredentials: true });

        if (response.data?.token) {
          setToken(response.data.token);
          // console.log("✅ Token fetched successfully:", response.data.token);
        } else {
          console.error("❌ Token not found in API response.");
        }
      } catch (error) {
        console.error("❌ Error fetching call token:", error);
      }
    };

    if (callAccepted) {
      getToken().then(() => {
        // console.log("✅ Now starting the call after token fetch...");
      });
    }
  }, [callAccepted]);

  useEffect(() => {
    const startCall = async () => {
      try {
        console.log("Initializing Zego Engine...");
        const zg = new ZegoExpressEngine(
          parseInt(import.meta.env.VITE_ZEGO_APP_ID),
          import.meta.env.VITE_ZEGO_SERVER_URL
        );

        setZegoEngine(zg);

        zg.on("roomStreamUpdate", async (roomId, updateType, streamList) => {
          console.log("Room Stream Update:", updateType, streamList);
          if (updateType === "ADD" && streamList.length > 0) {
            // console.log("Playing Remote Stream...");
            const remoteContainer = document.getElementById("remote-video");

            if (remoteContainer) {
              const mediaElement = document.createElement(
                data.callType === "video" ? "video" : "audio"
              );
              mediaElement.id = streamList[0].streamID;
              mediaElement.autoplay = true;
              mediaElement.playsInline = true;
              remoteContainer.appendChild(mediaElement);

              const stream = await zg.startPlayingStream(
                streamList[0].streamID
              );
              mediaElement.srcObject = stream;
              // console.log("Remote Stream Played Successfully");
            }
          } else if (updateType === "DELETE") {
            // console.log("Remote Stream Removed. Ending Call...");
            if (localStream) zg.destroyStream(localStream);
            zg.logoutRoom(data.roomId.toString());
            endCall();
          }
        });

        // console.log("Logging into Zego Room with Token:", token);
        await zg.loginRoom(
          data.roomId.toString(),
          token,
          { userID: userInfo.id.toString(), userName: userInfo.name },
          { userUpdate: true }
        );

        // console.log("Creating Local Stream...");
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

        const streamID = "stream_" + Date.now();
        setPublishStream(streamID);
        setLocalStream(localStream);
        // console.log("Publishing Local Stream...");
        await zg.startPublishingStream(streamID, localStream);
        // console.log("Call Started Successfully!");
      } catch (error) {
        console.error("❌ Error starting call:", error);
      }
    };

    if (token) {
      startCall();
    }
  }, [token]);

  const endCallHandler = () => {
    console.log("Ending Call...");
    if (!data?.recipient?._id && !data?.from?.id) {
      // console.error("❌ Call data is missing:", data);
      return;
    }

    const id = data.recipient?._id || data.from?.id;
    if (zegoEngine && localStream && publishStream) {
      zegoEngine.destroyStream(localStream);
      zegoEngine.stopPublishingStream(publishStream);
      zegoEngine.logoutRoom(data.roomId.toString());
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
          {callAccepted && data?.callType !== "video"
            ? "On-going call"
            : "Calling..."}
        </span>
      </div>

      {(!callAccepted || data?.callType === "audio") && (
        <div className="my-24">
          <Avatar className="h-32 w-32 rounded-full overflow-hidden">
            {user?.image ? (
              <AvatarImage
                src={`${HOST}/${user.image}`}
                alt="profile"
                className="object-cover w-32 h-32 rounded-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-32 w-32 text-5xl font-bold border-[1px] flex items-center justify-center rounded-full ${getColor(
                  user?.color
                )}`}
              >
                {user?.firstName
                  ? user.firstName.charAt(0)
                  : user?.email
                  ? user.email.charAt(0)
                  : ""}
              </div>
            )}
          </Avatar>
        </div>
      )}

      <div className="my-5 relative" id="remote-video">
        <div className="absolute bottom-5 right-5" id="local-video"></div>
      </div>

      <button
        onClick={endCallHandler}
        className="mt-8 p-4 bg-red-600 text-white text-lg rounded-full flex items-center justify-center"
      >
        <MdOutlineCallEnd size={32} />
      </button>
    </div>
  );
}

export default CallScreen;
