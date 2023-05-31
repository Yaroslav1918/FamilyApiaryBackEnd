// cart.js
const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  items: [
    {
      id: { type: Number, required: true },
      image: { type: String, required: true },
      text: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  totalQuantity: { type: Number, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;


