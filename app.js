const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const path = require('path');
const fs = require('fs');
const authRouter = require("./routes/api/auth");
const productsRouter = require("./routes/api/products");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.get('/api/translations/:lng', (req, res) => {
  const { lng } = req.params;
  const filePath = path.join(__dirname, 'public', 'locales', lng, 'translation.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const translation = JSON.parse(fileContents);
  res.json(translation);

});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
