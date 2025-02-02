import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store";
import WaveSurfer from "wavesurfer.js";
import { HOST } from "@/utils/constants";
import { FaPause, FaPlay } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getColor } from "@/lib/utils";

function VoiceMsg({ message, VoiceMsg }) {
  const { selectedChatData } = useAppStore();
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
        setCurrentPlaybackTime(0);
      });
    }

    return () => {
      waveform.current.destroy();
    };
  }, []);

  useEffect(() => {
    const audioUrl = `${HOST}/${message.audioUrl}`;
    const audio = new Audio(audioUrl);
    setAudioMessage(audio);
    waveform.current.load(audioUrl);
    waveform.current.on("ready", () => {
      setTotalDuration(waveform.current.getDuration());
    });
  }, [message.audioUrl]);
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
  return (
    <div
      className={`flex items-center gap-5 text-white px-4 pr-2 py-4 text-sm rounded-md mb-2 ${
        message.sender === selectedChatData._id
          ? "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          : "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
      }`}
    >
      <div className="cursor-pointer text-xl">
        {!isPlaying ? (
          <FaPlay onClick={handlePlayAudio} />
        ) : (
          <FaPause onClick={handlePauseAudio} />
        )}
      </div>

      <div className="relative flex flex-col">
        <div className="w-60" ref={waveFormRef}></div>
        <div className="text-bubble-meta text-[11px] pt-1 flex justify-between absolute bottom-[-22px] w-full">
          <span>
            {formatTime(isPlaying ? currentPlaybackTime : totalDuration)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default VoiceMsg;
