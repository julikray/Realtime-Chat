import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

//app config
const app = express()
const port = 4000;

//middleware
app.use(express.json())
// app.use(cors())

app.use(cors({
    origin: 'http://localhost:5173', // Update to your frontend URL
    credentials: true,
  }));
  

app.use("/uploads/profiles" , express.static("uploads/profiles"));

app.use(cookieParser());

//db connection
connectDB();

//api endpoints

app.use("/api/auth", authRoutes)

app.get("/" , (req,res)=>{
    res.send("API working")
})


app.listen(port ,()=>{
    console.log(`Server started on http://localhost:${port}`)
} )