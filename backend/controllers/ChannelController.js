import mongoose from "mongoose";
import Channel from "../models/ChannelModel.js";
import User from "../models/UserModel.js";

export const createChannel = async (request, response, next) => {
  try {
    const { name, members } = request.body;
    const userId = request.userId;

    if (!name || !members || !Array.isArray(members)) {
      return response
        .status(400)
        .send("Channel name and members are required.");
    }

    const admin = await User.findById(userId);
    if (!admin) {
      return response.status(404).send("Admin user not found.");
    }

    const validMembers = await User.find({ _id: { $in: members } });
    if (validMembers.length !== members.length) {
      return response.status(400).send("Some members are not valid users.");
    }

    const newChannel = new Channel({
      name,
      members,
      admin: userId,
    });

    await newChannel.save();

    return response.status(201).json({ channel: newChannel });
  } catch (error) {
    console.error("Error creating channel:", error);
    return response.status(500).send("Internal Server Error");
  }
};

export const getUserChannel = async (request, response, next) => {
  try {

   const userId = new mongoose.Types.ObjectId(request.userId);
   const channels = await Channel.find({
      $or: [{ admin: userId }, {members: userId } ],
   }).sort({updatedAt: -1 });
    
   

    return response.status(201).json({ channels });
  } catch (error) {
    console.error("Error creating channel:", error);
    return response.status(500).send("Internal Server Error");
  }
};
