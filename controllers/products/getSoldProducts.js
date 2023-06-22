const Cart = require("../../models/product");

const getSoldProducts = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await Cart.findOne({ owner: _id });
    const { items, totalQuantity } = req.body.cartItems;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const date = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${date}`;
    if (!user.boughtProducts.has(formattedDate)) {
      user.boughtProducts.set(formattedDate, {
        items,
        boughtTotalQuantity: totalQuantity,
      });
    } else {
      const existingBoughtProduct = user.boughtProducts.get(formattedDate);
      existingBoughtProduct.items.push(...items);
      existingBoughtProduct.boughtTotalQuantity += totalQuantity;
      user.boughtProducts.set(formattedDate, existingBoughtProduct);
    }
    user.items = user.items.filter(
      (one) => !items.find((two) => one.id === two.id)
    );
    user.totalQuantity = !totalQuantity;
    await user.save();
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getSoldProducts;
