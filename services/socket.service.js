const socketio = require("socket.io");

const socketSetup = (server) => {
  const io = socketio(server);

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
