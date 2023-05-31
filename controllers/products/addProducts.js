const Cart = require("../../models/product");


const addContact = async (req, res) => {
  const { _id } = req.user;
  const { items, totalQuantity } = req.body;
  let cart = await Cart.findOne({ owner: _id });
  if (!cart) {
    cart = await Cart.create({ ...req.body, owner: _id });
  } else {
    for (const item of items) {
      const existingItem = cart.items.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.totalPrice += item.price;
      } else {
        cart.items.push(item);
      }
    }
    cart.totalQuantity = totalQuantity;
    await cart.save();
  }

  res.status(201).json(cart);
};


module.exports = addContact;
