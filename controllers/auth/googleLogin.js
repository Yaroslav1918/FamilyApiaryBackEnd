const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const googleLogin = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findOne({ email });


  if (user) {
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: {
        email,
        name,
      },
    });
  } else {
    const newUser = await User.create({
      name,
      email,

    });

    const payload = {
      id: newUser._id
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });

    res.status(201).json({
      token,
      user: {
        name,
        email,
      },
    });
  }
};

module.exports = googleLogin;
