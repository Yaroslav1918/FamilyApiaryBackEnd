const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const path = require('path');
const fs = require('fs');
const authRouter = require("./routes/api/auth");
const productsRouter = require("./routes/api/products");
const app = express();
const { OAuth2Client } = require("google-auth-library");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const { User } = require("./models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const { createError } = require("./helpers");
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
app.post("/api/google-login", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
const result = await User.findOne({ email });
if (result) {
  throw createError(409, "Email already exist");
}
const hashPassword = await bcrypt.hash(email, 10);
const avatarURL = gravatar.url(email);
const verificationToken = v4();
await User.create({
  name,
  email,
  password: hashPassword,
  verificationToken,
  avatarURL,
});

res.status(201).json({
  user: {
    name,
    email,
  },
});
  res.status(201);
  res.json({ name, email, picture });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
