const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const registration = require("./registration");
const updateAvatar = require("./updateAvatar");
const verificationToken = require("./verificationToken");
const getEmailVerificationToken = require("./getEmailVerificationToken");
const googleLogin = require("./googleLogin");

module.exports = {
  login,
  logout,
  googleLogin,
  getCurrentUser,
  registration,
  updateAvatar,
  verificationToken,
  getEmailVerificationToken,
};
