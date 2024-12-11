import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";

function MessageBar() {
  const [message, setMessage] = useState("");

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6 ">
      <div className="flex-1 flex bg-[#2e2b33] rounded-md items-center gap-5 pr-5 ">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none "
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all ">
          <GrAttachment className="text-2xl" />
        </button>

        <div className="realtive">
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all ">
          <RiEmojiStickerLine className="text-2xl" />
        </button>
        </div>

      </div>
    </div>
  );
}

export default MessageBar;
