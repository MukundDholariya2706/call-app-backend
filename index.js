require("./config/dbConnection");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const socketSetup = require("./services/socket.service");

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// app.use(rootRouter);

app.get("/", (req, res) => {
  res.json({message: 'Call app backend'})
})

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

socketSetup(server);
