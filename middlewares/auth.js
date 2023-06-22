const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { createError } = require("../helpers");
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      console.log("🚀 ~ file: auth.js:15 ~ auth ~ id:", id)
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw createError(401);
      }
      req.user = user;
      next();
    } catch (error) {
      throw createError(401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
