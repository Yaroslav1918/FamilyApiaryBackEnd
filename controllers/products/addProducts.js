const Cart = require("../../models/product");

const addContact = async (req, res) => {
  const { _id } = req.user;
  const { items, totalQuantity } = req.body;
  let cart = await Cart.findOne({ owner: _id });

  if (!cart) {
    cart = await Cart.create({ ...req.body, owner: _id });
  } else {
    items.forEach((newItem) => {
      const index = cart.items.findIndex((item) => item.id === newItem.id);

      if (index !== -1) {
        cart.items[index] = newItem;
      } else {
        cart.items.push(newItem);
      }
    });

    cart.totalQuantity = totalQuantity;
    await cart.save();
  }

  res.status(201).json(cart);
};

module.exports = addContact;
