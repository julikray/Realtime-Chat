import { Router  } from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import { createChannel, getUserChannel } from "../controllers/ChannelController.js";


const channelRoutes = Router();

channelRoutes.post("/create-channel",verifyToken, createChannel );
channelRoutes.get("/get-user-channels", verifyToken, getUserChannel );

export default channelRoutes;