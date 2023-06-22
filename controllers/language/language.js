const path = require("path");
const fs = require("fs").promises;

const language = async (req, res) => {
  const { lng } = req.params;

  const filePath = path.join( "public", "locales", lng, "translation.json");
   console.log("🚀 ~ file: language.js:15 ~ language ~ translation:", filePath);
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const translation = JSON.parse(fileContents);
 
    res.json(translation);
  } catch (error) {
    // Handle error while reading the file
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Failed to read file" });
  }
};

module.exports = language;
