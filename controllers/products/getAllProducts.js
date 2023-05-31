
const products = require("../../data/products.json");
const getAllProducts = async (req, res) => {
  res.json(products);
};

module.exports = getAllProducts;
