const express = require("express");
const { createUser, userLogin } = require("../controller/user.controller");
const { user_validator } = require("../validation/user.middleware");
const { validatorFunc } = require("../services/bodyvalidator.service");
const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", user_validator, validatorFunc, createUser);

module.exports = userRouter;
