const getAllProducts = require("./getAllProducts");
const getById = require("./getById");
const addProducts = require("./addProducts");
const updateContactById = require("./updateContactById");
const removeProduct = require("./removeProduct");
const getSoldProducts = require("./getSoldProducts");
const addWishProduct = require("./addWishProduct")
const removeWishProduct = require ("./removeWishProduct")
module.exports = {
  getAllProducts,
  getById,
  getSoldProducts,
  addProducts,
  updateContactById,
  removeProduct,
  addWishProduct,
  removeWishProduct,
};
