const express = require("express");
const userRouter = require("./user.route");

// Root Router
const RootRouter = express.Router();

RootRouter.use("/", (req, res) => {
  res.json({ message: "Welcome to call app backend" });
});

RootRouter.use("/user", userRouter);

module.exports = RootRouter;
