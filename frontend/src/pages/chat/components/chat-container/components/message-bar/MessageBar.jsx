import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine, RiImageLine } from "react-icons/ri";
import { useSocket } from "@/context/SocketContext";
import { api } from "@/lib/api";
import { useAppStore } from "@/store";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";
import EmojiPicker from "emoji-picker-react";
import GifSearch from "@/components/GifSearch";
import { MdOutlineGifBox } from "react-icons/md";


function MessageBar() {
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const socket = useSocket();
  const { userInfo, selectedChatType, selectedChatData } = useAppStore();

  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [gifPickerOpen, setGifPickerOpen] = useState(false); // Toggle GIF picker

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target) &&
        !gifPickerOpen // Close emoji picker only if GIF picker is not open
      ) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef, gifPickerOpen]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleGifSelect = (gifUrl) => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: undefined,
        recipient: selectedChatData._id,
        messageType: "gif",
        fileUrl: gifUrl,
      });
    } else if (selectedChatType === "channel") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: undefined,
        messageType: "gif",
        fileUrl: gifUrl,
        channelId: selectedChatData._id,
      });
    }
    setGifPickerOpen(false); // Close GIF picker after selection
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      if (selectedChatType === "contact") {
        socket.emit("sendMessage", {
          sender: userInfo.id,
          content: message,
          recipient: selectedChatData._id,
          messageType: "text",
          fileUrl: undefined,
        });
      } else if (selectedChatType === "channel") {
        socket.emit("sendMessage", {
          sender: userInfo.id,
          content: message,
          messageType: "text",
          fileUrl: undefined,
          channelId: selectedChatData._id,
        });
      }
      setMessage("");
    }
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileUrl: response.data.filePath,
            });
          } else if (selectedChatType === "channel") {
            socket.emit("send-channel-message", {
              sender: userInfo.id,
              content: undefined,
              messageType: "file",
              fileUrl: response.data.filePath,
              channelId: selectedChatData._id,
            });
          }
          setMessage("");
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-3 sm:px-6 mb-4 gap-3 sm:gap-4">
      <div className="flex-1 flex bg-[#2e2b33] rounded-md items-center gap-2 sm:gap-3 pr-3 sm:pr-5">
        <input
          type="text"
          className="flex-1 p-2 sm:p-3 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          onClick={handleAttachmentClick}
        >
          <GrAttachment className="text-xl sm:text-2xl" />
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleAttachmentChange}
        />

        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => {
              setEmojiPickerOpen(!emojiPickerOpen);
              setGifPickerOpen(false); 
            }}
          >
            <RiEmojiStickerLine className="text-xl sm:text-2xl" />
          </button>
          {emojiPickerOpen && (
            <div className="absolute bottom-12 sm:bottom-16 right-0" ref={emojiRef}>
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
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => {
              setGifPickerOpen(!gifPickerOpen);
              setEmojiPickerOpen(false); 
            }}
          >
            <MdOutlineGifBox  className="text-xl sm:text-2xl" />
          </button>
          {gifPickerOpen && (
            <div className="absolute bottom-12 sm:bottom-16 right-0">
              <GifSearch onGifSelect={handleGifSelect} />
            </div>
          )}
        </div>
      </div>

      <button
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-3 sm:p-4 focus:border-none hover:bg-[#741bda] focus:bg-[#741bda] focus:outline-none focus:text-white duration-300 transition-all"
        onClick={handleSendMessage}
      >
        <IoSend className="text-xl sm:text-2xl" />
      </button>
    </div>
  );
}

export default MessageBar;
