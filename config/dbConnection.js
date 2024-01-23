const mongoose = require("mongoose");
const { DB_URL } = require("../environment/environment");

MONGODB_URI = DB_URL;

mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", async () => {
  console.log("Database connected!");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongodb Connection failed! ", err);
  mongoose.disconnect();
});

module.exports = mongoose;
