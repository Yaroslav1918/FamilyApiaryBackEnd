const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const { DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3038, () => {
      console.log("Server running. Use our API on port: 3038");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
