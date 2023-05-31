const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const registration = require("./registration");
const updateAvatar = require("./updateAvatar");
const verificationToken = require("./verificationToken");
const getEmailVerificationToken = require("./getEmailVerificationToken");

module.exports = {
  login,
  logout,
  getCurrentUser,
  registration,
  updateAvatar,
  verificationToken,
  getEmailVerificationToken,
};
