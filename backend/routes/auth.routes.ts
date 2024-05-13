
import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { register , login , getUser, logout , update } from "../controller/auth.control"
 
const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/user", authenticateToken, getUser);

router.post("/logout", authenticateToken, logout);

router.put("/user", authenticateToken, update);


export default router;