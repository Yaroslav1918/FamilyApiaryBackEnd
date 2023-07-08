const Cart = require("../../models/product");

const removeWishProduct = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  try {
    const cart = await Cart.findOne({ owner: _id });
    const itemToRemove = cart.wishItems.find((item) => +item.id === +id);

    if (!itemToRemove) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (itemToRemove.quantity === 1) {
      cart.wishItems = cart.wishItems.filter((item) => +item.id !== +id);
    } else {
      itemToRemove.quantity--;
      itemToRemove.totalPrice -= itemToRemove.price;
    }
    cart.wishTotalQuantity--; 
    await cart.save();

    res.json({ cart, message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = removeWishProduct;
