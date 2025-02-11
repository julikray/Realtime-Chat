import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";
import Channel from "./models/ChannelModel.js";
import User from "./models/UserModel.js";

const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
    console.log("Current userSocketMap:", Array.from(userSocketMap.entries()));
  };

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message);

    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image color")
      .populate("recipient", "id email firstName lastName image color");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("recieveMessage", messageData);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit("recieveMessage", messageData);
    }
  };


  const sendChannelMessage = async (message) => {
    try {
      const { channelId, sender, content, messageType, fileUrl, audioUrl } =
        message;

      const createdMessage = await Message.create({
        sender,
        recipient: null,
        content,
        messageType,
        timestamp: new Date(),
        fileUrl: fileUrl || null, 
        audioUrl: audioUrl || null, 
      });

      const messageData = await Message.findById(createdMessage._id)
        .populate("sender", "id email firstName lastName image color")
        .exec();

      await Channel.findByIdAndUpdate(channelId, {
        $push: { messages: createdMessage._id },
      });

      const channel = await Channel.findById(channelId).populate("members");

      const finalData = { ...messageData._doc, channelId: channel._id };

      if (channel && channel.members) {
        channel.members.forEach((member) => {
          const memberSocketId = userSocketMap.get(member._id.toString());
          if (memberSocketId) {
            io.to(memberSocketId).emit("recieve-channel-message", finalData);
          }
        });

        const adminSocketId = userSocketMap.get(channel.admin?._id.toString());
        if (adminSocketId) {
          io.to(adminSocketId).emit("recieve-channel-message", finalData);
        }
      }
    } catch (error) {
      console.error("Error in sendChannelMessage:", error);
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log("User ID not provided during connection.");
    }

    socket.on("outgoing-voice-call", async (data) => {
      const { from, to, roomId, callType } = data;

      const userId = from && from.id ? from.id : from;

      if (!userId) {
        console.error("Invalid user ID for outgoing call");
        return;
      }

      try {
        const callerDetails = await User.findById(userId);
        if (!callerDetails) {
          console.error("Caller not found");
          return;
        }

        console.log(
          "Outgoing Voice Call to:",
          to,
          "Socket ID:",
          userSocketMap.get(to)
        );

        const sendUserSocket = userSocketMap.get(to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("incoming-voice-call", {
            from: {
              id: callerDetails._id,
              firstName: callerDetails.firstName,
              lastName: callerDetails.lastName,
              email: callerDetails.email,
              image: callerDetails.image,
              color: callerDetails.color,
              profileSetup: callerDetails.profileSetup,
            },
            roomId,
            callType,
          });
        } else {
          console.log("Recipient is not connected!");
        }
      } catch (error) {
        console.error("Error fetching caller details:", error);
      }
    });

    socket.on("outgoing-video-call", async (data) => {
      const { from, to, roomId, callType } = data;

      const userId = from && from.id ? from.id : from;

      if (!userId) {
        console.error("Invalid user ID for outgoing call");
        return;
      }

      try {
        const callerDetails = await User.findById(userId);
        if (!callerDetails) {
          console.error("Caller not found");
          return;
        }

        console.log(
          "Outgoing Video Call to:",
          to,
          "Socket ID:",
          userSocketMap.get(to)
        );

        const sendUserSocket = userSocketMap.get(to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("incoming-video-call", {
            from: {
              id: callerDetails._id,
              firstName: callerDetails.firstName,
              lastName: callerDetails.lastName,
              email: callerDetails.email,
              image: callerDetails.image,
              color: callerDetails.color,
              profileSetup: callerDetails.profileSetup,
            },
            roomId,
            callType,
          });
        } else {
          console.log("Recipient is not connected!");
        }
      } catch (error) {
        console.error("Error fetching caller details:", error);
      }
    });

    socket.on("reject-voice-call", (data) => {
      const sendUserSocket = userSocketMap.get(data.from);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("voice-call-rejected");
      }
    });

    socket.on("reject-video-call", (data) => {
      const sendUserSocket = userSocketMap.get(data.from);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("video-call-rejected");
      }
    });

    socket.on("accept-incoming-call", ({ id }) => {
      const sendUserSocket = userSocketMap.get(id);
      socket.to(sendUserSocket).emit("accept-call");
      console.log("User Socket Map:", userSocketMap);
      console.log("accept-incoming-call", id, "Socket ID:", sendUserSocket);
    });

  
    socket.on("sendMessage", sendMessage);
    socket.on("send-channel-message", sendChannelMessage);
    socket.on("disconnect", () => disconnect(socket));
  });

  return io;
};

export default setupSocket;
