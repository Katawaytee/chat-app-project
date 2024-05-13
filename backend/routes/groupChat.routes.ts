import { Router } from "express";
import { getAllGroupChats, createGroupChat, getOneGroupChat } from "../controller/groupChat.control";

const router = Router();

router.get("/", getAllGroupChats);

router.get("/:id", getOneGroupChat);

router.post("/", createGroupChat);

export default router;
