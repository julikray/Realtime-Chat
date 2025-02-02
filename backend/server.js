import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import contactRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessageRoutes.js";
import channelRoutes from "./routes/ChannelRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;


app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:5173', 
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());


app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));
app.use("/uploads/audio", express.static("uploads/audio"));


connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes);


app.get("/", (req, res) => {
  res.send("API is working");
});


const server = app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});


setupSocket(server);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
