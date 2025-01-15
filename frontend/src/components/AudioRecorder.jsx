import { useAppStore } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import {
  FaMicrophone,
  FaPauseCircle,
  FaPlay,
  FaStop,
  FaTrash,
} from "react-icons/fa";
import { MdSend } from "react-icons/md";

import WaveSurfer from 'wavesurfer.js'
import axios from "axios";
import { HOST, UPLOAD_AUDIO_ROUTE } from "@/utils/constants";
import { useSocket } from "@/context/SocketContext";

function AudioRecorder({ hide }) {
  // Correct destructuring from the store
  const { userInfo, selectedChatType, selectedChatData } = useAppStore();
  const socket = useSocket();
  const [recording, setRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [waveform, setWaveform] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);
  const [renderedAudio, setRenderedAudio] = useState(null);


  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const waveFormRef = useRef(null);

  useEffect(() => {
    let interval;
    if (recording) {
      interval = setInterval(() => {
        setRecordingDuration((prevDuration) => {
          setTotalDuration(prevDuration + 1);
          return prevDuration + 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [recording]);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "#ccc",
      progressColor: "#4a9eff",
      cursorColor: "#7ae3c3",
      barWidth: 2,
      height: 30,
      responsive: true,
    });
    setWaveform(wavesurfer);

    wavesurfer.on("finish", () => {
      setisPlaying(false);
    });

    return () => {
      wavesurfer.destroy();
    };
  }, []);

  useEffect(() => {
    if (waveform) handleStartRecording();
  }, [waveform]);

  const handleStartRecording = () => {
    setRecordingDuration(0);
    setCurrentPlaybackTime(0);
    setTotalDuration(0);
    setRecording(true);
    setRecordedAudio(null);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioRef.current.srcObject = stream;

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          const audioURL = URL.createObjectURL(blob);
          const audio = new Audio(audioURL);
          setRecordedAudio(audio);

          waveform.load(audioURL);
        };
        mediaRecorder.start();
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      waveform.stop();

      const audioChunks = [];
      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3");
        setRenderedAudio(audioFile);
      });
    }
  };

  useEffect(() => {
    if (recordedAudio) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(recordedAudio.currentTime);
      };
      recordedAudio.addEventListener("timeupdate", updatePlaybackTime);
      return () => {
        recordedAudio.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [recordedAudio]);

  const handlePlayRecording = () => {
    if (recordedAudio) {
      waveform.stop();
      waveform.play();
      recordedAudio.play();
      setisPlaying(true);
    }
  };

  const handlePauseRecording = () => {
    waveform.stop();
    recordedAudio.pause();
    setisPlaying(false);
  };

  // const sendRecording = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("audio", renderedAudio);
  //     const response = await axios.post(UPLOAD_AUDIO_ROUTE, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       params: {
  //         from: userInfo.id,
  //         to: selectedChatData.id,
  //       },
  //     });
  //     if (response.status === 201) {
  //       socket.current.emit("send-msg", {
  //         to: selectedChatData?.id,
  //         from: userInfo?.id,
  //         message: response.data.message,
  //       });
  //       dispatch({
  //         type: reducerCases.addMessage,
  //         newMessage: {
  //           ...response.data.message,
  //         },
  //         fromSelf: true,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


// const sendRecording = async () => {
//   try {
//     const formData = new FormData();
//     formData.append("audio", renderedAudio); 
//     const response = await axios.post(`${HOST}/${UPLOAD_AUDIO_ROUTE}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       params: {
//         from: userInfo.id,
//         to: selectedChatData.id,
//       },
//     });

    
//     if (response.status === 200 && response.data) {
//       if (selectedChatType === "contact") {
//         socket.emit("sendMessage", {
//           sender: userInfo.id,
//           content: undefined,
//           recipient: selectedChatData._id,
//           messageType: "audio",
//           audioUrl: response.data.audioUrl,
//         });
//       } else if (selectedChatType === "channel") {
//         socket.emit("send-channel-message", {
//           sender: userInfo.id,
//           content: undefined,
//           messageType: "audio",
//           audioUrl: response.data.audioUrl,
//           channelId: selectedChatData._id,
//         });
//       }
    
//     }

//     if (response.status === 200) {
//       console.log(response.data);
//       // Handle success, maybe emit a socket event
//     }

//     // if (response.status === 200) {
//     //   socket.current.emit("send-msg", {
//     //     to: selectedChatData?.id,
//     //     from: userInfo?.id,
//     //     message: response.data.message,
//     //   });
//     //   dispatch({
//     //     type: reducerCases.addMessage,
//     //     newMessage: {
//     //       ...response.data.message,
//     //     },
//     //     fromSelf: true,
//     //   });
//     // }
    
//   } catch (error) {
//     console.error("Error uploading audio:", error);
//   }
// };


const sendRecording = async () => {
  try {
    const formData = new FormData();
    formData.append("audio", renderedAudio); 
    const response = await axios.post(`${HOST}/${UPLOAD_AUDIO_ROUTE}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        from: userInfo.id,
        to: selectedChatData.id,
      },
    });
    
    if (response.status === 200 && response.data.audioUrl) {
      const audioUrl = response.data.audioUrl; // Ensure this URL is correct

      if (selectedChatType === "contact") {
        socket.emit("sendMessage", {
          sender: userInfo.id,
          content: undefined,
          recipient: selectedChatData._id,
          messageType: "audio",
          audioUrl: audioUrl, // Use the URL returned from the backend
        });
        
      } 
      
      else if (selectedChatType === "channel") {
        socket.emit("send-channel-message", {
          sender: userInfo.id,
          content: undefined,
          recipient: selectedChatData._id,
          messageType: "audio",
          audioUrl: audioUrl, 
          channelId: selectedChatData._id,
         
        });
      }
      
    }
  } catch (error) {
    console.error("Error uploading audio:", error);
  }
};


  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex text-2xl w-full justify-end items-center bg-[#2e2b33] rounded-md gap-2 sm:gap-3 pr-3 sm:pr-5 ">
      <div className="pt-1">
        <FaTrash className="text-panel-header-icon" onClick={() => hide()} />
      </div>
      <div className="mx-4 py-2 px-4 text-white text-lg flex gap-3 justify-center items-center rounded-full bg-[#1c1d25]">
        {recording ? (
          <div className="text-red-500 animate-pulse 2-60 text-center">
            Recording <span>{recordingDuration}s</span>
          </div>
        ) : (
          <div>
            {recordedAudio && (
              <>
                {!isPlaying ? (
                  <FaPlay onClick={handlePlayRecording} />
                ) : (
                  <FaStop onClick={handlePauseRecording} />
                )}
              </>
            )}
          </div>
        )}
        <div className="w-60" ref={waveFormRef} hidden={recording} />
        {recordedAudio && isPlaying && (
          <span>{formatTime(currentPlaybackTime)} </span>
        )}
        {recordedAudio && !isPlaying && (
          <span>{formatTime(totalDuration)} </span>
        )}

        <audio ref={audioRef} hidden />
      </div>

      <div className="mr-4">
        {!recording ? (
          <FaMicrophone
            className="text-red-500"
            onClick={handleStartRecording}
          
          />
        ) : (
          <FaPauseCircle
            className="text-red-500"
            onClick={handleStopRecording}
          />
        )}
      </div>
      <div>
        <MdSend
          className="text-panel-header-icon cursor-pointer mr-4"
          title="Send"
          onClick={sendRecording}
         
        />
      </div>
    </div>
  );
}

export default AudioRecorder;
