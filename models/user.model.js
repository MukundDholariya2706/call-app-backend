const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    username: {
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
    is_google_login: {
      type: Boolean,
      default: false,
    },
    is_facebook_login: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Enable the timestamps option
  }
);

const User = mongoose.model("user", userSchema, "user");
module.exports = User;
