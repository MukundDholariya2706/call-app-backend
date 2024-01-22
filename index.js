require("./config/dbConnection");
const http = require("http");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const socketSetup = require("./services/socket.service");
const RootRouter = require("./routes/route");
const swagger = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.index");
const webpush = require("web-push");

dotenv.config();

const PORT = process.env.PORT;

const app = express();

// setup web-notification
webpush.setVapidDetails(
  "mailto:mukunddtridhyatech@gmail.com",
  process.env.webpushPublicKey || "BIIuxA2Hv0Ol-XFXQe4Wkqtc7sP83dqxb2eECPj3zKpyc3kCXfNwg0ObiG5U4xNzlrw5DaKwC9reOL1G1NurXk8",
  process.env.webpushPrivateKey || "_MvUbY6bBKXk49OUGCiXWc9B5Co75q7LY2R6rjFu1JQ"
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));
app.use(RootRouter);

app.use("/", (req, res) => {
  res.json({
    message: "Welcome to the API. Visit /api-docs for documentation",
  });
});

const server = http.createServer(app);
socketSetup(server);

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
