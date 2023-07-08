const Cart = require("../../models/product");

const addWishProduct = async (req, res) => {
  const { _id } = req.user;
  const { wishlist, wishTotalQuantity } = req.body;
  console.log("🚀 ~ file: addWishProduct.js:6 ~ addWishProduct ~ req.body:", req.body)
  let cart = await Cart.findOne({ owner: _id });

  if (!cart) {
    cart = await Cart.create({
      ...req.body,
      wishItems: wishlist,
      owner: _id,
    });
  } else {
    wishlist.forEach((newItem) => {
      const index = cart.wishItems.findIndex((item) => item.id === newItem.id);

      if (index !== -1) {
        cart.wishItems[index] = newItem;
      } else {
        cart.wishItems.push(newItem);
      }
    });

    cart.wishTotalQuantity = wishTotalQuantity;
    await cart.save();
  }

  res.status(201).json(cart);
};

module.exports = addWishProduct;
