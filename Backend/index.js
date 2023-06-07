const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./router/user");
const PostRouter = require("./router/Post");
const cors = require("cors");
const socket = require("socket.io");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successfull"))
  .catch(() => {
    console.log("Some error occured");
  });
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/post", PostRouter);

const server = app.listen(5000, () => {
  console.log("Server is running");
});

const io = socket(server, {
  cors: {
    origin: "https://mireagram.vercel.app",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
  socket.on("calluser", ({ to, signalData, from, name }) => {
    io.to(to).emit("calluser", { signal: signalData, from, name });
  });
});
