const { validationResult } = require("express-validator");
const sendResponse = require("./response.service");

const validatorFunc = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("VALIDATION....", errors.array());
    return sendResponse(res, 400, false, errors.array()[0].msg, null);
  }
  next();
};

module.exports = {
  validatorFunc,
};
