const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

MONGODB_URI = process.env.DB_URL || "mongodb+srv://mukunddtridhyatech:vCsXygauy6gHlKk8@cluster0.4w78rh6.mongodb.net/call-app";

mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", async () => {
  console.log("Database connected!");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongodb Connection failed! ", err);
  mongoose.disconnect();
});

module.exports = mongoose;
