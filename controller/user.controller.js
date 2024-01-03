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

const userLogin = async (req, res) => {
  try {
    const reqBody = req.body;
    let user = await userFindOneService({ email: reqBody.email });

    if (!user) {
      return sendResponse(res, 404, false, "User does not exist", null);
    }

    if (!bcrypt.compareSync(reqBody.password, user.password)) {
      return sendResponse(res, 400, false, "Password is invalid", null);
    }

    const token = await user.generateAuthToken();

    user = user.toObject();
    delete user.password;

    return sendResponse(res, 200, true, "Login successfully", {
      user,
      token,
    });
  } catch (error) {
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

const setAvatar = async (req, res) => {
  try {
    console.log(req.user, 'req.user')
    
  } catch (error) {
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

module.exports = { createUser, userLogin, setAvatar };
