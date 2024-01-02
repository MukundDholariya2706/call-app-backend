const express = require("express");
const userRouter = require("./user.route");

// Root Router
const RootRouter = express.Router();

RootRouter.use("/", (req, res) => {
  res.json({ message: "res.send('Welcome to the API. Visit /api-docs for documentation.');" });
});

RootRouter.use("/user", userRouter);

module.exports = RootRouter;
