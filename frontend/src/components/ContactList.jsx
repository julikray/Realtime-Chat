import { useAppStore } from "@/store";
import React from "react";
import { Avatar } from "./ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatType,
    setSelectedChatData,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    setSelectedChatType(isChannel ? "channel" : "contact");
    setSelectedChatData(contact);

    if (selectedChatData?._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => {
        const isSelected = selectedChatData?._id === contact._id;
        const contactName = isChannel ? contact.name : `${contact.firstName} ${contact.lastName}`;

        return (
          <div
            key={contact._id}
            className={`pl-10 py-2 cursor-pointer transition-all duration-300 ${
              isSelected ? "bg-[#8417ff]" : "hover:bg-[#f1f1f111]"
            }`}
            onClick={() => handleClick(contact)}
          >
            <div className="flex gap-5 items-center text-neutral-300">
              {/* Avatar for Contacts */}
              {!isChannel && (
                <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                  {contact.image ? (
                    <AvatarImage
                      src={`${HOST}/${contact.image}`}
                      alt="profile"
                      className="object-cover w-full h-full bg-black"
                    />
                  ) : (
                    <div
                      className={`uppercase flex items-center justify-center h-10 w-10 text-lg border rounded-full ${getColor(
                        contact.color
                      )}`}
                    >
                      {contact.firstName?.charAt(0) || contact.email?.charAt(0)}
                    </div>
                  )}
                </Avatar>
              )}

              {/* Avatar for Channels */}
              {isChannel && (
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#ffffff22]">
                  #
                </div>
              )}

              <span>{contactName}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;
