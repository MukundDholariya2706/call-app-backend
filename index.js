require("./config/dbConnection");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const socketSetup = require("./services/socket.service");
const RootRouter = require("./routes/route");
const swagger = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.index");

dotenv.config();

const PORT = process.env.PORT;

const app = express();

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

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

socketSetup(server);
