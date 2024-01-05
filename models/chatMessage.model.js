const mongoose = require("mongoose");

const chatMessaageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      trim: true,
      required: true,
    },
    fromUser: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    toUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const ChatMessage = mongoose.model(
  "ChatMessage",
  chatMessaageSchema,
  "chatMessage"
);
module.exports = ChatMessage;
