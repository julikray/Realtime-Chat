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

//app config
const app = express()
const port = 4000;

//middleware
app.use(express.json())
// app.use(cors())

app.use(cors({
    origin: process.env.ORIGIN, 
    credentials: true,
  }));
  

app.use("/uploads/profiles" , express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files") );

app.use(cookieParser());

//db connection
connectDB();

//api endpoints

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes );
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes );


app.get("/" , (req,res)=>{
    res.send("API working")
})



const server = app.listen(port ,()=>{
    console.log(`Server started on http://localhost:${port}`)
} );

setupSocket(server);