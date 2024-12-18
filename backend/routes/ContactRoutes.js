import { Router } from "express";
import { getAllContacts, getContactsForDMList, searchContacts } from "../controllers/ContactController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";


const contactRoutes = Router();

contactRoutes.post("/search", verifyToken, searchContacts );
contactRoutes.get("/get-contacts-for-dm",verifyToken, getContactsForDMList );
contactRoutes.get("/get-all-contacts", verifyToken , getAllContacts);

export default contactRoutes;