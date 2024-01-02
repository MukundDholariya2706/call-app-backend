const express = require("express");
const userRouter = require("./user.route");

// Root Router
const RootRouter = express.Router();

RootRouter.use("/user", userRouter);

module.exports = RootRouter;
