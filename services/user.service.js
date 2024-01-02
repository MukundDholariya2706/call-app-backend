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

module.exports = {
  createUserService,
  userFindOneService,
};
