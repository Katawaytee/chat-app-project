import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import chatRouter from "./routes/chat.routes";
import groupChatRouter from "./routes/groupChat.routes";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { Message } from "@prisma/client";
import { db } from "./lib/db";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3001;

// Middleware ==========================================================================================

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Route ===============================================================================================

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/group-chats", groupChatRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello, this is backend!");
});

// CHAT ===============================================================================================

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

let onlineUsers: { userId: string; socketId: string }[] = [];

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // group chat

  socket.on("send-group-message", (message, roomId) => {
    socket.to(roomId).emit("receive-group-message", message);
  });

  socket.on("join-room", (roomId, callback) => {
    socket.join(roomId);
    callback();
  });

  // online status

  socket.on("new-user-add", (newUserId) => {
    if (!onlineUsers.some((user) => user.userId === newUserId)) {
      // if user is not added before
      onlineUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("new user is here!", onlineUsers);
    }
    // send all active users to new user
    io.emit("get-users", onlineUsers);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("user disconnected", onlineUsers);
    // send all online users to all users
    io.emit("get-users", onlineUsers);
  });

  socket.on("offline", () => {
    // remove user from active users
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("user is offline", onlineUsers);
    // send all online users to all users
    io.emit("get-users", onlineUsers);
  });

  socket.on(
    "chats:sendMessage",
    async (message: Message, senderSide: "A" | "B", sendTo: string) => {
      console.log(message);
      try {
        const createMessage = await db.message.create({
          data: message,
        });

        let updateData: any = {
          lastUpdated: message.sentAt,
        };

        if (senderSide === "A") {
          updateData = {
            ...updateData,
            participantBUnread: {
              increment: 1,
            },
          };
        } else {
          updateData = {
            ...updateData,
            participantAUnread: {
              increment: 1,
            },
          };
        }

        const updateChat = await db.chat.update({
          where: {
            id: message.chatId,
          },
          data: updateData,
        });

        const senderUser = await db.user.findUnique({
          where: {
            id: sendTo,
          },
          select: {
            id: true,
            displayName: true,
            imageURL: true,
          },
        });

        if (!senderUser) return;

        io.emit(`chats:${message.chatId}:addMessage`, message);

        io.emit(`users:${message.senderId}:chatsUpdate`);
        io.emit(`users:${sendTo}:chatsUpdate`);

      } catch (err) {
        console.log(err);
      }
    }
  );
});

// ====================================================================================================

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export { io };

module.exports = app;
