import * as dotenv from "dotenv";
dotenv.config();

export default {
  APP: process.env.APP || "development",
  PORT: process.env.PORT || "3000",

  DB_DIALECT: process.env.DB_DIALECT || "mongo",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb://heroku_08gdpgn3:jpipmitfhnumju7o1d45o15jeb@ds121089.mlab.com:21089/heroku_08gdpgn3",
  DB_NAME: process.env.DB_NAME || "example_db",
  DB_PASSWORD: process.env.DB_PASSWORD || "db-password",
  DB_PORT: process.env.DB_PORT || "27017",
  DB_USER: process.env.DB_USER || "root"
};
