let io;
const socketSetup = (server) => {
  io = require("socket.io")(server, {
    cors: {
      origin: [
        "https://172.16.0.210:3001",
        "https://call-app-backend.vercel.app",
        "http://localhost",
        "http://localhost:4200",
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
  });
};

module.exports = socketSetup;
