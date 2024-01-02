const User = require("../models/user.model");

export const createUserService = async (payload) => {
  try {
    return await User.create(payload);
  } catch (error) {
    throw error;
  }
};

export const userFindOneService = async (filter) => {
  try {
    return await User.findOne(filter);
  } catch (error) {
    throw error;
  }
};
