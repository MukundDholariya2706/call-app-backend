const ChatMessage = require("../models/chatMessage.model");

let io;
const socketSetup = (server) => {
  io = require("socket.io")(server, {
    cors: {
      origin: [
        "http://172.16.0.210:4200",
        "http://localhost",
        "http://localhost:4200",
        "https://call-app-frontend.vercel.app",
      ],
      methods: ["GET", "PATCH", "POST", "HEAD", "OPTIONS"],
      transports: ["websocket"],
    },
  });

  let userCount = 0;

  io.on("connection", (socket) => {
    userCount++;
    console.log("user connected", userCount);

    // diconnected event
    socket.on("disconnect", () => {
      userCount--;
      console.log("user disconnected", userCount);
    });

    socket.on("room", async (obj) => {
      console.log(io.sockets.adapter.rooms, "total room");
      var rooms = io.sockets.adapter.rooms;
      var room = rooms.get(obj.id);

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

      socket.on("callInit", async (calledDetails) => {
        const { fromUser, toUser } = calledDetails;

        socket.to(toUser?._id).emit("anyOneCalling", {
          callerDetails: fromUser,
          receiverDetails: toUser,
        });
      });

      socket.on("callendFromCaller", async (calledDetails) => {
        const { fromUser, toUser, callend } = calledDetails;

        socket.to(toUser?._id).emit("callendFromCallerEmit", { callend });
      });

      socket.on("callendFromReceiver", async (calledDetails) => {
        const { fromUser, toUser, callend } = calledDetails;

        socket.to(toUser?._id).emit("callendFromReceiverEmit", { callend });
      });

      socket.on("receiverPickUpCall", async (calledDetails) => {
        const { fromUser, toUser } = calledDetails;

        socket
          .to(toUser?._id)
          .emit("receiverPickUpCallEmit", { callPickUp: true });
      });

      socket.on("ready", (roomName) => {
        console.log("READY");
        socket.to(roomName.reciverUser).emit("ready", roomName);
      });

      socket.on("candidate", (calledDetails) => {
        console.log("candidate");
        const { fromUser, toUser, candidate } = calledDetails;
        socket.to(toUser?._id).emit("candidate", candidate);
      });

      socket.on("offer", (calledDetails) => {
        console.log("OFFER");
        const { fromUser, toUser, offer } = calledDetails;
        socket.to(toUser?._id).emit("offer", offer);
      });

      socket.on("answer", (calledDetails) => {
        console.log("ANSWER");
        const { fromUser, toUser, answer } = calledDetails;
        socket.to(toUser?._id).emit("answer", answer);
      });

      socket.on("userConnect", (userData) => {
        socket.broadcast.emit('userConnected', userData)
      })

      socket.on("userDisconnect", (userData) => {
        socket.broadcast.emit('userDisconnected', userData)
      })
    });
  });
};

module.exports = socketSetup;
