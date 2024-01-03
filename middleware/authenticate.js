const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const sendResponse = require("../services/response.service");
const ObjectId = mongoose.Types.ObjectId;

dotenv.config();

let authenticate = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return sendResponse(res, 401, false, "Unauthorized, please login.", null);
    }

    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return sendResponse(res, 404, false, "Token not found", null);
    }

    const decoded = jwt.verify(token, process.env.API_SECRET);
  } catch (error) {
    throw error;
  }
};

module.exports = authenticate;
