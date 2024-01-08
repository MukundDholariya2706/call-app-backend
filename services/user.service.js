const ChatMessage = require("../models/chatMessage.model");
const User = require("../models/user.model");

const createUserService = async (payload) => {
  try {
    return await User.create(payload);
  } catch (error) {
    throw error;
  }
};

const userFindOneService = async (filter) => {
  try {
    return await User.findOne(filter);
  } catch (error) {
    throw error;
  }
};

const userUpdateService = async (userId, payload) => {
  try {
    return await User.findByIdAndUpdate(userId, payload, { new: true });
  } catch (error) {
    throw error;
  }
};

const getAllUsersService = async (req) => {
  try {
    return await User.find({ _id: { $ne: req.user._id } }).select([
      "_id",
      "email",
      "username",
      "profileImage",
      "isOnline"
    ]);
  } catch (error) {
    throw error;
  }
};

const getUserChatHistoryService = async (payload) => {
  const { fromUser, toUser } = payload;
  try {
    let message = await ChatMessage.find({
      $or: [
        {
          $and: [{ fromUser: fromUser }, { toUser: toUser }],
        },
        {
          $and: [{ fromUser: toUser }, { toUser: fromUser }],
        },
      ],
    })
      .sort({ createdAt: 1 })
      .lean();

    return message;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUserService,
  userFindOneService,
  userUpdateService,
  getAllUsersService,
  getUserChatHistoryService,
};
