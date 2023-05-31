const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const jimp = require("jimp");

const updateAvatar = async (req, res) => {
  const { _id: id } = req.user;
  const { originalname, path: tempUpload } = req.file;
  const [extension] = originalname.split(".").reverse();
  const fileName = `${id}.${extension}`;
  const avatarImage = await jimp.read(tempUpload);
  avatarImage.resize(250, 250).write(tempUpload);
  const resultUpload = path.join(avatarsDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
