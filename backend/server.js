// // import express from "express";
// // import cors from "cors";
// // import dotenv from 'dotenv';
// // import { connectDB } from "./config/db.js";
// // import authRoutes from "./routes/AuthRoutes.js";
// // import cookieParser from "cookie-parser";
// // import contactRoutes from "./routes/ContactRoutes.js";
// // import setupSocket from "./socket.js";
// // import messagesRoutes from "./routes/MessageRoutes.js";
// // import channelRoutes from "./routes/ChannelRoutes.js";

// // dotenv.config();

// // const app = express();
// // const port = 4000;

// // // Middleware
// // app.use(express.json());
// // app.use(cors({ origin: process.env.ORIGIN, credentials: true }));


// // app.use(cors({
// //     origin: process.env.ORIGIN, 
// //     credentials: true,
// //   }));
  

// // app.use("/uploads/profiles", express.static("uploads/profiles"));
// // app.use("/uploads/files", express.static("uploads/files"));
// // app.use("/uploads/audio", express.static("uploads/audio"));
// // app.use(cookieParser());



// // // DB connection
// // connectDB();

// // // API endpoints
// // app.use("/api/auth", authRoutes);
// // app.use("/api/contacts", contactRoutes);
// // app.use("/api/messages", messagesRoutes);
// // app.use("/api/channel", channelRoutes);

// // app.get("/", (req, res) => {
// //   res.send("API is working");
// // });

// // const server = app.listen(port, () => {
// //   console.log(`Server started on http://localhost:${port}`);
// // });

// // setupSocket(server);



// import express from "express";
// import cors from "cors";
// import dotenv from 'dotenv';
// import { connectDB } from "./config/db.js";
// import authRoutes from "./routes/AuthRoutes.js";
// import cookieParser from "cookie-parser";
// import contactRoutes from "./routes/ContactRoutes.js";
// import setupSocket from "./socket.js";
// import messagesRoutes from "./routes/MessageRoutes.js";
// import channelRoutes from "./routes/ChannelRoutes.js";

// dotenv.config();

// const app = express();
// const port = 4000;

// // Middleware
// app.use(express.json());
// app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
// app.use(cookieParser());

// // Static file serving
// app.use("/uploads/profiles", express.static("uploads/profiles"));
// app.use("/uploads/files", express.static("uploads/files"));
// app.use("/uploads/audio", express.static("uploads/audio"));

// // DB connection
// connectDB();

// // API endpoints
// app.use("/api/auth", authRoutes);
// app.use("/api/contacts", contactRoutes);
// app.use("/api/messages", messagesRoutes);
// app.use("/api/channel", channelRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("API is working");
// });

// // Start the server
// const server = app.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`);
// });

// // Set up socket connection
// setupSocket(server);

// // Error handling middleware (optional but recommended)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });


// server.js (Backend)

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

// CORS configuration to allow the frontend URL
app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:5173', 
  credentials: true,
}));

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Static file serving (for your audio files)
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));
app.use("/uploads/audio", express.static("uploads/audio"));

// Database connection (assuming connectDB is defined)
connectDB();

// API endpoints
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

// Set up socket connection (assuming setupSocket is defined)
setupSocket(server);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
