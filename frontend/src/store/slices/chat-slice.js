export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessagesContacts: [],
  channels:[],

  callType: null, // 'voice' or 'video'
  callData: null, // Details about the call (e.g., recipient info, channel ID)
  isCallActive: false, // Whether a call is currently active

  // Start voice or video call
  startVoiceCall: (callData) => set({ callType: "voice", callData, isCallActive: true }),
  startVideoCall: (callData) => set({ callType: "video", callData, isCallActive: true }),

  // End call
  endCall: () => {set({ callType: null, callData: null, isCallActive: false });},


  setChannels: (channels)=> set({channels}),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  setDirectMessagesContacts: (directMessagesContacts) =>
    set({ directMessagesContacts }),

  addChannel: (channel) =>{
    const channels = get().channels;
    set({channels:[channel,...channels]});
  },

  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),

  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;

    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,

          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },

  addChannelInChannelList: (message) =>{
    const channels = get().channels;
    const data = channels.find((channel)=> channel._id === message.channelId );
    const index = channels.findIndex(
      (channel) =>channel._id === message.channelId
    );
    if(index !== -1 && index !== undefined){
      channels.splice(index ,1);
      channels.unshift(data);
    }
  },

  addContactsInDMContacts:(message) =>{
    const userId = get().userInfo.id;
    const fromId = message.sender._id === userId
    ? message.recipient._id
    : message.sender._id;

    const fromData = message.sender._id === userId ? message.recipient : message.sender;

    const dmContacts = get().directMessagesContacts;
    const data = dmContacts.find((contact) => contact._id === fromId);
    const index = dmContacts.findIndex((contact) => contact._id === fromId);

    console.log({data , index , dmContacts , userId , message , fromData});
    if(index !== -1 && index !== undefined){
      console.log("in if condition");
      dmContacts.splice(index , 1);
      dmContacts.unshift(data);
    }
    else{
      console.log("in else condition");
      dmContacts.unshift(fromData);
    }
    set({directMessagesContacts: dmContacts});

  },
  leaveGroup: (groupId) => {
    setState((state) => ({
      contacts: state.contacts.filter((contact) => contact._id !== groupId),
    }));
  },
  


});

