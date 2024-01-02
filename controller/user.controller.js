const bcrypt = require("bcryptjs");
const sendResponse = require("../services/response.service");
const {
  createUserService,
  userFindOneService,
} = require("../services/user.service");

const createUser = async (req, res) => {
  try {
    const reqBody = req.body;

    let userIsExist = await userFindOneService({ email: reqBody.email });

    if (userIsExist) {
      return sendResponse(res, 400, false, "Duplicate email found", null);
    }

    // Hash password
    reqBody.password = await bcrypt.hash(reqBody.password, 10);

    const user = await createUserService(reqBody);
    return sendResponse(res, 200, true, "User registerd", user);
  } catch (error) {
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

module.exports = { createUser };
