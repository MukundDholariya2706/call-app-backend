const dotenv = require("dotenv");
const path = require('path');

dotenv.config({path: path.join(__dirname, '..', '.env')});

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    API_SECRET: process.env.API_SECRET,
    WEB_PUSH_PUBLIC_KEY: process.env.WEB_PUSH_PUBLIC_KEY,
    WEB_PUSH_PRIVATE_KEY: process.env.WEB_PUSH_PRIVATE_KEY
}