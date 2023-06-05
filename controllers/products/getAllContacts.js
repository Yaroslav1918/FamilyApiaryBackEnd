const Cart = require("../../models/product");

const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const result = await Cart.find({ owner: _id })
  res.json(result);
};

module.exports = getAllContacts;
