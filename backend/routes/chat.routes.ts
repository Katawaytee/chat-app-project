import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticateToken } from "../middlewares/authToken";
import { io } from "..";

const router = Router();

import {getChat , createChat , updateChat} from '../controller/chat.control'

router.get("/:id", authenticateToken, getChat);

router.post("/", authenticateToken, createChat);

router.put("/:id/read", authenticateToken, updateChat);

export default router;
