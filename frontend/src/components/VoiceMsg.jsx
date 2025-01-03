import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store";
import WaveSurfer from "https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js";
import { HOST } from "@/utils/constants";
import { FaPlay, FaStop } from "react-icons/fa";

function VoiceMsg({ message }) {
  const { userInfo, selectedChatType, selectedChatData } = useAppStore();
  const [audioMessage, setAudioMessage] = useState(null);
  const [isPlaying, setisPlaying] = useState(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const waveFormRef = useRef(null);
  const waveform = useRef(null);

  useEffect(() => {
    if (waveform.current === null) {
      waveform.current = WaveSurfer.create({
        container: waveFormRef.current,
        waveColor: "#ccc",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30,
        responsive: true,
      });

      waveform.current.on("finish", () => {
        setisPlaying(false);
      });
    }

    return () => {
      waveform.current.destroy();
    };
  }, []);

  useEffect(() => {
    const audioURL = `${HOST}/${message.message}`;
    const audio = new Audio(audioURL);
    setAudioMessage(audio);
    waveform.current.load(audioURL);
    waveform.current.on("ready", () => {
      setTotalDuration(waveform.current.getDuration());
    });
  }, [message.message]);

  useEffect(() => {
    if (audioMessage) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(audioMessage.currentTime);
      };
      audioMessage.addEventListener("timeupdate", updatePlaybackTime);
      return () => {
        audioMessage.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [audioMessage]);

  const handlePlayAudio = () => {
    if (audioMessage) {
      waveform.current.stop();
      waveform.current.play();
      audioMessage.play();
      setisPlaying(true);
    }
  };

  const handlePauseAudio = () => {
    waveform.current.stop();
    audioMessage.pause();
    setisPlaying(false);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return(


    <div className={`flex items-center gap-5 text-white px-4 pr-2 py-4 text-sm rounded-md ${
      message.sender === selectedChatData._id
      ? "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
      : "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
    } `}
    
    >
      <div>
        <Avatar type="lg" image={userInfo?.profile} />
      </div>

      <div className="cursor-pointer text-xl" >
        {!isPlaying ? (
          <FaPlay onClick={handlePlayAudio}/>
        ):(
          <FaStop onClick={handlePauseAudio}/>
        )}
      </div>

      <div className="relavtive">
        <div className="w-60">
          ref={waveFormRef}
        </div>
        <div className="text-bubble-meta text-[11px] pt-1 flex justify-between absolute bottom-[-22px] w-full " >
          <span>
            {formatTime(isPlaying? currentPlaybackTime:totalDuration)}
          </span>
        </div>
        {/* <div className="flex gap-1" >
          <span> {calculateTime(message.createAt) } </span>
          {
            message.sender === userInfo.id &&  
          }
        </div> */}

      </div>



    </div>

  )

}

export default VoiceMsg;
