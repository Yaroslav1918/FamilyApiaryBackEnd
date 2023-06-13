const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { v4 } = require("uuid");


const googleLogin = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findOne({ email });
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  const verificationToken = v4();

  if (user) {
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: {
        email,
        name,
      },
    });
  } else {
    await User.create({
      name,
      email,
      verificationToken,
    });
    res.status(201).json({
      user: {
        name,
        email,
      },
    });
  }
};

module.exports = googleLogin;
