
import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { getUser , deleteUser, updateEmail, updatePassword , getChats, getAllUser } from '../controller/user.control'

const router = Router();

router.get("/:id", getUser);

router.delete("/:id", authenticateToken, deleteUser);

router.put("/:id/email", authenticateToken, updateEmail);

router.put("/:id/password", authenticateToken, updatePassword);

router.get("/:id/chats", authenticateToken, getChats);

router.get("/", getAllUser)

export default router;
