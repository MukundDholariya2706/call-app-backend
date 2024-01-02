const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true, // Enable the timestamps option
  }
);

const User = mongoose.model("user", userSchema, "user");
module.exports = User;
