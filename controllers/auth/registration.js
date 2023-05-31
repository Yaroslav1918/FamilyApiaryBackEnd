const { User, schemas } = require("../../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const { createError } = require("../../helpers");

const registration = async (req, res) => {
  const { error } = schemas.signup.validate(req.body);
  if (error) {
    throw createError(400, "Email or password invalid1");
  }
  const { email, password, name } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
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
};

module.exports = registration;
