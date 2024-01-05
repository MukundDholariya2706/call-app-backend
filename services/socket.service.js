const ChatMessage = require("../models/chatMessage.model");

let io;
const socketSetup = (server) => {
  io = require("socket.io")(server, {
    cors: {
      origin: [
        "https://172.16.0.210:3001",
        "https://call-app-backend.vercel.app",
        "http://localhost",
        "http://localhost:4200",
        "https://call-app-frontend.vercel.app",
      ],
      methods: ["GET", "PATCH", "POST", "HEAD", "OPTIONS"],
    },
  });

  let userCount = 0;

  io.on("connection", (socket) => {
    userCount++;
    console.log("user connected", userCount);
    socket.on("disconnect", () => {
      userCount--;
      console.log("user disconnected", userCount);
    });

    socket.on("room", async (obj) => {
      socket.join(obj.id);

      socket.on("sendMessage", async (messageObj) => {
        const { fromUser, toUser, message } = messageObj;
        console.log("sendMessage", "sendMessage");
        try {
          const messaged = new ChatMessage({ fromUser, toUser, message });
          await messaged.save();

          messaged.toUser = toUser;
          socket.to(toUser).emit("receiveMessage", messaged);
        } catch (error) {
          console.log(error, "error");
        }
      });
    });
  });
};

module.exports = socketSetup;
