// import { Router } from "express";
// import { verifyToken } from "../middleware/AuthMiddleware.js";
// import { getMessages,  uploadAudio,  uploadFile } from "../controllers/MessagesController.js";
// import multer from "multer";

// const messagesRoutes = Router();

// const upload = multer({dest: "uploads/files" });
// messagesRoutes.post("/get-messages" , verifyToken , getMessages );
// messagesRoutes.post("/upload-file", verifyToken , upload.single("file"), uploadFile);
// messagesRoutes.post("/upload-audio", upload.single("audio"), uploadAudio);

// export default messagesRoutes;

import { Router } from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import { getMessages, uploadAudio, uploadFile } from "../controllers/MessagesController.js";
import multer from "multer";


const uploadFileMiddleware = multer({ dest: "uploads/files" });
const uploadAudioMiddleware = multer({ dest: "uploads/audio" });

const messagesRoutes = Router();


messagesRoutes.post("/get-messages", verifyToken, getMessages);
messagesRoutes.post("/upload-file", verifyToken, uploadFileMiddleware.single("file"), uploadFile);
messagesRoutes.post("/upload-audio", uploadAudioMiddleware.single("audio"), uploadAudio);

export default messagesRoutes;
