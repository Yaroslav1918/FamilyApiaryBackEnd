const Cart = require("../../models/product");


// const removeProduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await Cart.updateOne(
//       { "items.id": id },
//       { $pull: { items: { id: id } } }
//     );

//     if (result.nModified === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     const cart = await Cart.findOne({});
//     console.log("🚀 ~ file: removeProduct.js:17 ~ removeProduct ~ cart:", cart)
//     if (cart.items.length === 0) {
//       await Cart.deleteOne({});
//       return res.json({ message: "Cart deleted" });
//     }
//     cart.totalQuantity --;
//     await cart.save();
//     res.json({ cart, message: "Product deleted" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// module.exports = removeProduct;
const removeProduct = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  try {
    const cart = await Cart.findOne({ owner: _id });
    const itemToRemove = cart.items.find(item => +item.id === +id);
    console.log("🚀 ~ file: removeProduct.js:38 ~ removeProduct ~ itemToRemove:",itemToRemove)

    if (!itemToRemove) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (itemToRemove.quantity === 1) {
      // If the item's quantity is 1, remove the item from the cart
      cart.items = cart.items.filter(item => +item.id !== +id);
    } else {
      // If the item's quantity is more than 1, decrement the quantity by 1
      itemToRemove.quantity--;
      itemToRemove.totalPrice -= itemToRemove.price;
    }
    
    cart.totalQuantity--;
    await cart.save();


    res.json({ cart, message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = removeProduct;
