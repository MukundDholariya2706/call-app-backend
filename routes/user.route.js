const express = require("express");
const { createUser } = require("../controller/user.controller");
const userRouter = express.Router();

userRouter.post('/login');
userRouter.post('/register', createUser);

module.exports = userRouter;
