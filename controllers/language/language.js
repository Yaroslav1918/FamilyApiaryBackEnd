const path = require("path");
const fs = require("fs");

const language = async (req, res) => {
  const { lng } = req.params;
  const filePath = path.join(
    __dirname,
    "public",
    "locales",
    lng,
    "translation.json"
  );
  const fileContents = fs.readFileSync(filePath, "utf8");
  const translation = JSON.parse(fileContents);
  res.json(translation);
};

module.exports = language;
