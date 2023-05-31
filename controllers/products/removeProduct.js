const Cart = require("../../models/product");
const createError = require("../../helpers/createError");
const { isValidObjectId } = require("mongoose");

const removeProduct = async (req, res) => {

  const { id } = req.params;
  // const isValid = isValidObjectId(id);
  // if (!isValid) {
  //   throw createError(404);
  // }
  try {
    const result = await Cart.updateOne(
      { "items.id": id },
      { $pull: { items: { id: id } } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const cart = await Cart.findOne({});
    if (cart.items.length === 0) {
      await Cart.deleteOne({});
      return res.json({ message: "Cart deleted" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = removeProduct;
