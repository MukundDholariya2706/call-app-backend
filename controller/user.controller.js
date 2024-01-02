const sendResponse = require("../services/response.service");

const createUser = async (req, res) => {
  try {
  } catch (error) {
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

module.exports = {createUser}