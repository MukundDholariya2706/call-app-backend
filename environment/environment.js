const dotenv = require("dotenv");
const path = require('path');

dotenv.config({path: path.join(__dirname, '..', '.env')});

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    API_SECRET: process.env.API_SECRET,
    webpushPublicKey: process.env.webpushPublicKey,
    webpushPrivateKey: process.env.webpushPrivateKey
}