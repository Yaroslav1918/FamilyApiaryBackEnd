const { User } = require("../../models/user");
const { createError } = require("../../helpers/createError");
const { schemas } = require("../../models/user");

const { sendMail } = require("../../helpers");

const getEmailVerificationToken = async (req, res) => {
  const { error } = schemas.verify.validate(req.body);
  if (error) {
    throw createError(400, "missing required field email");
  }
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Подтвеждение email",
    html: `<a target="_blank" href='http://localhost:3038/api/users/${user.verificationToken}'>Нажмите чтобы подтвердить свой email</a>`,
  };
  sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = getEmailVerificationToken;
