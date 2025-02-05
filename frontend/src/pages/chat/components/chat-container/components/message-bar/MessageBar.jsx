import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { MdOutlineGifBox } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { useSocket } from "@/context/SocketContext";
import { api } from "@/lib/api";
import { useAppStore } from "@/store";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";
import EmojiPicker from "emoji-picker-react";
import GifSearch from "@/components/GifSearch";
import AudioRecorder from "@/components/AudioRecorder";

function MessageBar() {
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const socket = useSocket();
  const { userInfo, selectedChatType, selectedChatData } = useAppStore();

  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [gifPickerOpen, setGifPickerOpen] = useState(false);
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target) &&
        !gifPickerOpen
      ) {
        setEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [gifPickerOpen]);

  const handleAddEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  const handleGifSelect = (gifUrl) => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: "",
        recipient: selectedChatData._id,
        messageType: "gif",
        fileUrl: gifUrl,
      });
    } else if (selectedChatType === "channel") {
      socket.emit("send-channel-message", {
        sender: userInfo.id,
        content: "",
        messageType: "gif",
        fileUrl: gifUrl,
        channelId: selectedChatData._id,
      });
    }
    setGifPickerOpen(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const payload = {
        sender: userInfo.id,
        content: message,
        messageType: "text",
        fileUrl: undefined,
      };

      if (selectedChatType === "contact") {
        payload.recipient = selectedChatData._id;
        socket.emit("sendMessage", payload);
      } else if (selectedChatType === "channel") {
        payload.channelId = selectedChatData._id;
        socket.emit("send-channel-message", payload);
      }

      setMessage("");
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true,
        });

        if (response.status === 200 && response.data) {
          const payload = {
            sender: userInfo.id,
            content: "",
            messageType: "file",
            fileUrl: response.data.filePath,
          };

          if (selectedChatType === "contact") {
            payload.recipient = selectedChatData._id;
            socket.emit("sendMessage", payload);
          } else if (selectedChatType === "channel") {
            payload.channelId = selectedChatData._id;
            socket.emit("send-channel-message", payload);
          }
        }
      }
    } catch (error) {
      console.error("Attachment upload error:", error);
    }
  };

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-3 sm:px-6 mb-4 gap-3 sm:gap-4">
      <div className="flex-1 flex bg-[#2e2b33] rounded-md items-center gap-2 sm:gap-3 pr-3 sm:pr-5">
        {!showAudioRecorder ? (
          <>
            <input
              type="text"
              className="flex-1 p-2 sm:p-3 bg-transparent rounded-md focus:outline-none"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="text-neutral-500 focus:outline-none"
              onClick={handleAttachmentClick}
            >
              <GrAttachment className="text-xl sm:text-2xl" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAttachmentChange}
            />
            <div className="relative">
              <button
                className="text-neutral-500 focus:outline-none"
                onClick={() => {
                  setEmojiPickerOpen((prev) => !prev);
                  setGifPickerOpen(false);
                }}
              >
                <RiEmojiStickerLine className="text-xl sm:text-2xl" />
              </button>
              {emojiPickerOpen && (
                <div
                  className="absolute bottom-12 sm:bottom-16 right-0"
                  ref={emojiRef}
                >
                  <EmojiPicker
                    theme="dark"
                    onEmojiClick={handleAddEmoji}
                    autoFocusSearch={false}
                  />
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="text-neutral-500 focus:outline-none"
                onClick={() => {
                  setGifPickerOpen((prev) => !prev);
                  setEmojiPickerOpen(false);
                }}
              >
                <MdOutlineGifBox className="text-xl sm:text-2xl" />
              </button>
              {gifPickerOpen && (
                <div className="absolute bottom-12 sm:bottom-16 right-0">
                  <GifSearch onGifSelect={handleGifSelect} />
                </div>
              )}
            </div>
          </>
        ) : (
          <AudioRecorder hide={setShowAudioRecorder} />
        )}
      </div>

      <button
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-3 sm:p-4 focus:outline-none hover:bg-[#741bda] transition-all"
        onClick={
          message.trim() ? handleSendMessage : () => setShowAudioRecorder(true)
        }
      >
        {message.trim() ? (
          <IoSend className="text-xl sm:text-2xl" />
        ) : (
          <FaMicrophone className="text-xl sm:text-2xl" />
        )}
      </button>
    </div>
  );
}

export default MessageBar;
