const Cart = require("../../models/product");

const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Cart.find({ owner: _id }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email");
  res.json(result);
};

module.exports = getAllContacts;
